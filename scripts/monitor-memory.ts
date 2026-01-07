import os from "os";
import { exec } from "child_process";

const INTERVAL_MS = 5000;
const WARNING_THRESHOLD_MB = 3072;
const CRITICAL_THRESHOLD_MB = 3584;

interface ProcessInfo {
  pid: string;
  memory: number;
}

interface SystemMemory {
  total: string;
  used: string;
  free: string;
  usedPercent: string;
}

function formatBytes(bytes: number): string {
  return (bytes / 1024 / 1024).toFixed(2);
}

function formatUptime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hours}h ${minutes}m ${secs}s`;
}

function getSystemMemory(): SystemMemory {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;

  return {
    total: formatBytes(totalMem),
    used: formatBytes(usedMem),
    free: formatBytes(freeMem),
    usedPercent: ((usedMem / totalMem) * 100).toFixed(1),
  };
}

function findNodeProcesses(callback: (processes: ProcessInfo[]) => void): void {
  const isWindows = process.platform === "win32";

  if (isWindows) {
    exec(
      'tasklist /FI "IMAGENAME eq node.exe" /FO CSV /NH',
      (error, stdout) => {
        if (error) {
          callback([]);
          return;
        }

        const lines = stdout.trim().split("\n");
        const processes = lines
          .filter((line) => line.includes("node.exe"))
          .map((line) => {
            const match = line.match(
              /"([^"]+)","(\d+)","[^"]+","[^"]+","([^"]+)"/,
            );
            if (match) {
              const memStr = match[3].replace(/[^\d]/g, "");
              return {
                pid: match[2],
                memory: parseInt(memStr) / 1024,
              };
            }
            return null;
          })
          .filter((proc): proc is ProcessInfo => proc !== null);

        callback(processes);
      },
    );
  } else {
    exec("ps aux | grep node | grep -v grep", (error, stdout) => {
      if (error) {
        callback([]);
        return;
      }

      const lines = stdout.trim().split("\n");
      const processes = lines
        .map((line) => {
          const parts = line.trim().split(/\s+/);
          if (parts.length >= 11) {
            return {
              pid: parts[1],
              memory: parseFloat(parts[5]) / 1024,
            };
          }
          return null;
        })
        .filter((proc): proc is ProcessInfo => proc !== null);

      callback(processes);
    });
  }
}

const startTime = Date.now();
let maxMemory = 0;
let sampleCount = 0;
let totalMemory = 0;

console.clear();
console.log("=".repeat(60));
console.log("  NEXT.JS DEVELOPMENT MEMORY MONITOR");
console.log("=".repeat(60));
console.log("");
console.log("Monitoring Node.js processes every 5 seconds...");
console.log("Press Ctrl+C to stop");
console.log("");

function displayMemoryInfo(): void {
  findNodeProcesses((processes) => {
    const uptimeSeconds = (Date.now() - startTime) / 1000;

    console.clear();
    console.log("=".repeat(60));
    console.log("  NEXT.JS DEVELOPMENT MEMORY MONITOR");
    console.log("=".repeat(60));
    console.log("");

    const sysMem = getSystemMemory();
    console.log("SYSTEM MEMORY:");
    console.log(`  Total:  ${sysMem.total} MB`);
    console.log(`  Used:   ${sysMem.used} MB (${sysMem.usedPercent}%)`);
    console.log(`  Free:   ${sysMem.free} MB`);
    console.log("");

    console.log("NODE.JS PROCESSES:");
    console.log("");

    if (processes.length === 0) {
      console.log("  No Node.js processes found");
      console.log("  Make sure 'pnpm dev' is running");
    } else {
      let totalNodeMemory = 0;

      processes.forEach((proc, index) => {
        const memMB = proc.memory;
        totalNodeMemory += memMB;

        let status = "OK";
        if (memMB >= CRITICAL_THRESHOLD_MB) {
          status = "CRITICAL";
        } else if (memMB >= WARNING_THRESHOLD_MB) {
          status = "WARNING";
        }

        console.log(`  Process ${index + 1}:`);
        console.log(`    PID:    ${proc.pid}`);
        console.log(`    Memory: ${memMB.toFixed(2)} MB`);
        console.log(`    Status: ${status}`);
        console.log("");
      });

      sampleCount++;
      totalMemory += totalNodeMemory;
      if (totalNodeMemory > maxMemory) {
        maxMemory = totalNodeMemory;
      }

      const avgMemory = totalMemory / sampleCount;

      console.log("STATISTICS:");
      console.log(`  Total Node Memory:  ${totalNodeMemory.toFixed(2)} MB`);
      console.log(`  Peak Memory:        ${maxMemory.toFixed(2)} MB`);
      console.log(`  Average Memory:     ${avgMemory.toFixed(2)} MB`);
      console.log(`  Uptime:             ${formatUptime(uptimeSeconds)}`);
      console.log(`  Samples:            ${sampleCount}`);
      console.log("");

      console.log("THRESHOLDS:");
      console.log(`  Normal:   < ${WARNING_THRESHOLD_MB} MB`);
      console.log(
        `  Warning:  ${WARNING_THRESHOLD_MB} - ${CRITICAL_THRESHOLD_MB} MB`,
      );
      console.log(`  Critical: > ${CRITICAL_THRESHOLD_MB} MB`);
      console.log("");

      if (totalNodeMemory >= CRITICAL_THRESHOLD_MB) {
        console.log("CRITICAL: Memory usage is very high!");
        console.log("  Consider:");
        console.log("  1. Restart the dev server: pnpm clean && pnpm dev");
        console.log("  2. Check for memory leaks in your code");
        console.log("  3. Reduce concurrent operations");
        console.log("");
      } else if (totalNodeMemory >= WARNING_THRESHOLD_MB) {
        console.log("WARNING: Memory usage is elevated");
        console.log("  Monitor closely for further increases");
        console.log("");
      }
    }

    console.log("-".repeat(60));
    console.log(
      `Last updated: ${new Date().toLocaleTimeString()} | Next check in ${INTERVAL_MS / 1000}s`,
    );
  });
}

displayMemoryInfo();

const intervalId = setInterval(displayMemoryInfo, INTERVAL_MS);

process.on("SIGINT", () => {
  clearInterval(intervalId);
  console.log("");
  console.log("Memory monitor stopped");
  console.log("");
  process.exit(0);
});

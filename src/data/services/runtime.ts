export async function simulateLatency(delayMs = 80) {
  if (delayMs <= 0) return;
  await new Promise((resolve) => {
    setTimeout(resolve, delayMs);
  });
}


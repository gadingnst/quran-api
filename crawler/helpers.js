const sleep = async({ delay = 2000, throwReject = false }) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (throwReject) reject({ timeout: true });
    else resolve();
  }, delay);
});

module.exports = {
  sleep
};

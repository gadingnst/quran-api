const range = (start, end) =>
    start === end ? [start] : [start, ...range(start + 1, end)]

const sleep = async ({ delay = 2000, throwReject = false }) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (throwReject) reject({ timeout: true })
        else resolve()
    }, delay)
})

module.exports = {
    range,
    sleep
}

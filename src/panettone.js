const e = {};
const f = {};

const readFile = (path) => f[path]
const writeFile = (path, value) => { f[path] = value }

const panettone = {
    database: () => {
        const ref = path => {
            e[path] = e[path] || { value: (_) => { } }
            const on = (eventType, callback) => {
                e[path][eventType] = callback
            }
            const set = value => {
                writeFile(path, value)
                const snapshot = { val: () => readFile(path) }
                e[path]['value'](snapshot)
            }
            return { on, set }
        }
        return { ref }
    }
}

export default panettone
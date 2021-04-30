const e = {};
const f = {};

const readFile = (path) => f[path] || "" // TODO
const writeFile = (path, value) => { f[path] = value }

const panettone = {
    database: url => {
        e[url] = e[url] || {}
        const ref = path => {
            e[url][path] = e[url][path] || { value: (_) => { } }
            const snapshot = { val: () => readFile(path) }
            const on = (eventType, callback) => {
                e[url][path][eventType] = callback
                if (eventType === 'value')
                    e[url][path]['value'](snapshot)
            }
            const set = value => {
                writeFile(path, value)
                e[url][path]['value'](snapshot)
            }
            return { on, set }
        }
        return { ref }
    }
}

export default panettone
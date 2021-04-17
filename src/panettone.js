let GLOBAL_DIRTY_STATE;
let MAGIC_CALLBACK;

const panettone = {
    initializeApp: options => { },
    database: () => {
        const ref = path => {
            const on = (eventType, callback) => {
                MAGIC_CALLBACK = callback;
            }
            const set = value => {
                GLOBAL_DIRTY_STATE = value
                const snapshot = {
                    val: () => GLOBAL_DIRTY_STATE
                }
                MAGIC_CALLBACK(snapshot)
            }
            return { on, set }
        }
        return { ref }
    }
}

export default panettone
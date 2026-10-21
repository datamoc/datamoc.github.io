"use strict";

importScripts("pyroeis.bundle.js");

let vm = null;
self.postMessage({ kind: "ready" });

self.onmessage = ({ data }) => {
    try {
        if (data.action === "apply") {
            const next = new Pyroeis.PyroeisVm(undefined, 42, {
                sandbox: true,
                limits: {
                    instructions: 30000,
                    timeMs: 50,
                    allocation: 256 * 1024,
                    totalAllocation: 1024 * 1024
                }
            });
            try {
                next.run(data.source, "=pong-strategy");
                if (next.run("return type(target_y)") !== "function") {
                    throw new Error("Define function target_y(state) in Lua.");
                }
            } catch (error) {
                Pyroeis.lua.lua_close(next.state);
                throw error;
            }
            if (vm) Pyroeis.lua.lua_close(vm.state);
            vm = next;
            self.postMessage({ id: data.id, kind: "applied" });
        } else if (data.action === "target") {
            if (!vm) throw new Error("Apply a Lua strategy first.");
            const target = vm.call("target_y", data.state);
            if (!Number.isFinite(target)) throw new Error("target_y must return a number.");
            self.postMessage({ id: data.id, kind: "target", target });
        } else {
            throw new Error("Unknown Pyroeis request.");
        }
    } catch (error) {
        self.postMessage({ id: data.id, kind: "error", message: error.message });
    }
};

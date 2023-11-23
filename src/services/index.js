const moduleFiles = import.meta.glob("./modules/**/*.js", {
    eager: true
});

export const moduleArr = [];

let modules = {};

Object.keys(moduleFiles).forEach((item) => {
    Object.keys(moduleFiles[item]).forEach(key => {
        moduleArr.push(moduleFiles[item][key])
        modules = Object.assign(moduleFiles[item][key],modules)
    })
});

export default modules;


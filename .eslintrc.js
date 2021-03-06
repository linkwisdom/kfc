module.exports = {
    "root": true,
    "parser": "babel-eslint",
    "extends": "vue",
    "rules": {
        "indent": ["error", 4],
        "flowtype/define-flow-type": 1,
        "flowtype/use-flow-type": 1,
        "brace-style": ["error", "stroustrup"],
        "object-curly-spacing": ["error", "never"],
        "operator-linebreak": ["error", "before"]
    },
    "globals": {
        "window": true,
        "sessionStorage": true,
        "location": true,
        "alert": true,
        "$": true,
        "_": true,
        "store": true,
        "Object": true,
        "document": true
    },
    "plugins": [
        "standard",
        "flowtype",
        "promise"
    ]
}

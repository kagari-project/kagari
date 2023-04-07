// eslint-disable-next-line import/no-anonymous-default-export
export default {
  "sourceType": "unambiguous",
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "chrome": 100
        }
      }
    ],
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
  "plugins": []
}

import {compile, middleware, prefixer, rulesheet, serialize, stringify} from "../index.js"

describe('prefixer plugin', () => {
  const stylis = string => serialize(compile(`.user{${string}}`), middleware([prefixer, stringify]))

  test('declarations', () => {
    expect(stylis('display:flex;')).to.equal('.user{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}')
  })

  test('@keyframes', () => {
    expect(
      stylis(`
        @keyframes slidein {
          to { transform:translate(20px); }
        }
      `)
    ).to.equal([
      '@-webkit-keyframes slidein{to{-webkit-transform:translate(20px);-moz-transform:translate(20px);-ms-transform:translate(20px);transform:translate(20px);}}',
      '@keyframes slidein{to{-webkit-transform:translate(20px);-moz-transform:translate(20px);-ms-transform:translate(20px);transform:translate(20px);}}'
    ].join(''))
  })
})

describe('rulesheet plugin', () => {
  const rules = []
  const insert = rule => rules.push(rule)

  beforeEach(() => {
    rules.length = 0
  })

  describe('without other plugins', () => {
    const stylis = string => serialize(compile(`.user{${string}}`), middleware([rulesheet(insert), stringify]))

    test('single rule', () => {
      stylis('display:flex;')
      expect(rules.join('')).to.equal('.user{display:flex;}')
    })

    test('multiple rules', () => {
      stylis(`
        display:flex;

        &:hover {
          color: hotpink;
        }
      `)
      expect(rules.join('')).to.equal([
        '.user{display:flex;}',
        '.user:hover{color:hotpink;}'
      ].join(''))
    })

    test('@media', () => {
      stylis(`
        @media (max-width:600px) {
          color:red;
        }
      `)
      expect(rules.join('')).to.equal(`@media (max-width:600px){.user{color:red;}}`)
    })

    test('@supports + @media', () => {
      stylis(`
        @supports (display:block) {
          @media (min-width:10px) {
            background-color:seagreen;
          }
        }
      `)
      expect(rules.join('')).to.equal(`@supports (display:block){@media (min-width:10px){.user{background-color:seagreen;}}}`)
    })

    test('at rules', () => {
      stylis(`
        @page {
          size:A4 landscape;
        }
        @document url(://www.w3.org/),url-prefix(//www.w3.org/),domain(mozilla.org),regexp("https:.*") {
          body {
            color: red;
          }
        }
        @viewport {
          min-width:640px;
          max-width:800px;
        }
        @counter-style list {
          system:fixed;
          symbols:url();
          suffix:" ";
          }
        @-moz-document url-prefix() {
          .selector {
            color:lime;
          }
        }
        @page {
          color:red;
          @bottom-right {
            content: counter(pages);
            margin-right: 1cm;
          }
          width: none;
        }
      `)
      expect(rules.join('')).to.equal([
        `@page{size:A4 landscape;}`,
        `@document url(://www.w3.org/),url-prefix(//www.w3.org/),domain(mozilla.org),regexp("https:.*"){.user body{color:red;}}`,
        `@viewport{min-width:640px;max-width:800px;}`,
        `@counter-style list{system:fixed;symbols:url();suffix:" ";}`,
        `@-moz-document url-prefix(){.user .selector{color:lime;}}`,
        `@page{color:red;@bottom-right{content:counter(pages);margin-right:1cm;}width:none;}`
      ].join(''))
    })
  })

  describe('with prefixer', () => {
    const stylis = string => serialize(compile(`.user{${string}}`), middleware([rulesheet(insert), prefixer, stringify]))

    test('prefixed declarations', () => {
      stylis('display:flex;')
      expect(rules.join('')).to.equal('.user{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}')
    })

    test('prefixed keyframes', () => {
      stylis(`
        @keyframes slidein {
          to { transform:translate(20px); }
        }
      `)

      expect(rules.join('')).to.equal([
        '@-webkit-keyframes slidein{to{-webkit-transform:translate(20px);-moz-transform:translate(20px);-ms-transform:translate(20px);transform:translate(20px);}}',
        '@keyframes slidein{to{-webkit-transform:translate(20px);-moz-transform:translate(20px);-ms-transform:translate(20px);transform:translate(20px);}}'
      ].join(''))
    })
  })
})
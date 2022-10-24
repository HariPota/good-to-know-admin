import { createI18n } from 'vue-i18n'
import plLocale from 'element-plus/lib/locale/lang/pl'
import pl from './pl.yml'

const messages = {
  [plLocale.name]: {
    pl: plLocale.el,
    ...pl,
  },
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem('locale') || 'pl',
  messages,
})

export default i18n

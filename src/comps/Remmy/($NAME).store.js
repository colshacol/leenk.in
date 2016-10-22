import observable from 'mobx'

class ($NAME)Store = {
  @observable value = '($NAME)'
}

const store = new ($NAME)Store

export default store

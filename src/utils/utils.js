export default {
  getFarmetDate(time) {
    if (!time) {
      return ''
    }
    let date = new Date(time)
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  },
  pagination(data, callback) {
    return {
      onChange:(current)=>{
          callback(current)
      },
      current:data.result.page,
      pageSize:data.result.page_size,
      total: data.result.total_count,
      showTotal:()=>{
          return `共${data.result.total_count}条`
      },
      showQuickJumper:true
    }
  },
  // 添加购物车逻辑 解构赋值
  addToCart(good) {
    // 创建新购物车
    const newCart = [...this.state.cart]
    const idx = newCart.findIndex(c => c.id === good.id)
    const item = newCart[idx]
    if (item) {
      newCart.splice(idx, 1 , { ...newCart, count: item.count + 1 })
    } else {
      newCart.push({...good, count: 1})
    }
    this.setState({ cart:  newCart});
  }
}
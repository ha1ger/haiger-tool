// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var roomInfo = {}
  var restIdentity = []
  var id = ''
  await db.collection('wolf-kill-rooms').where({
    roomId: event.roomId
  }).get().then(res => {
    if (res.data.length > 0) {
      roomInfo = res.data[0]
      id = roomInfo._id
      restIdentity = roomInfo.restIdentity
      let choose = Math.ceil(Math.random() * restIdentity.length - 1);
      let uIdentity = restIdentity[choose]
      restIdentity.splice(choose, 1)
      roomInfo.players.push({
        identity: uIdentity
      })
    } else {
      return {
        errCode: 98,
        errMsg: '房间不存在'
      }
    }
  })
  return await db.collection('wolf-kill-rooms').where({
    roomId: event.roomId
  }).doc(id).update({
    data: {
      players: roomInfo.players,
      restIdentity,
      restPlayer: roomInfo.restPlayer - 1
    }
  })
}
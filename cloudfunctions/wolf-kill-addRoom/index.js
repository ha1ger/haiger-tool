// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  let identity = []
  let wolf = Math.floor(event.playerNum / 3);
  for (let i = 0; i < wolf; i++) {
    identity[i] = 'wolf'
  }
  let civilian = event.playerNum - 3 - wolf;
  for (let i = wolf; i < civilian + wolf; i++) {
    identity[i] = 'civilian'
  }
  identity.push('prophet', 'witch', 'hunter')
  let uIdentity = Math.floor(Math.random() * event.playerNum);
  let chooseItem = ''
  identity.map((item, index) => {
    if (index == uIdentity) {
      identity.splice(index, 1)
      chooseItem = item
    }
  })
  return await db.collection('wolf-kill-rooms')
    .add({
      data: {
        roomId: event.roomId,
        restIdentity: identity,
        maxPlayer: event.playerNum,
        restPlayer: event.playerNum - 1,
        players: [{
          identity: chooseItem
        }]
      }
    })
}
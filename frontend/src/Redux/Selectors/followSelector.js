import { createSelector } from 'reselect';


const setMyList = (state) => state;

export const gotFollow = createSelector(
  setMyList,
  (res) => getFollow(res)
);


function getFollow(res) {
 let array = res.follow.MyList.users
if(array){
  let data = res.user.profile.user_id
  let hideFollow = array.filter(elm => {
    return elm.user_id === data.id
  })
  return hideFollow

}else{
  return false
}


}



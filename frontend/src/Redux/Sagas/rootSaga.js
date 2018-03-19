



//List of Watchers
import { WatchLogin } from './watchers/WatchLogin';
import { WatchUser } from './watchers/WatchUser';
import { WatchForum } from './watchers/WatchForum';
import { WatchLab } from './watchers/WatchLab';
import { WatchSearch } from './watchers/WatchSearch';
import { WatchFollow } from './watchers/WatchFollow';




export default function* rootSaga (){

  yield [
    WatchLogin(),
    WatchUser(),
    WatchForum(),
    WatchLab(),
    WatchSearch(),
    WatchFollow(),
  ]

}

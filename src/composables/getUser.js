import { ref } from "vue";
import { projectAuth } from "../firebase/config";

// refs
const user = ref(projectAuth.currentUser);

// auth changes
projectAuth.onAuthStateChanged((_user) => {
  console.log("User state change. Current user is:", _user);
  // if (_user) { ///////hmmm??? check videpus
  user.value = _user;
  // }
});

const getUser = () => {
  return { user };
};

export default getUser;

import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);
const isPending = ref(false);

const signup = async (email, password, name) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await projectAuth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        console.log(cred.user);
      });
    await res.user.updateProfile({ displayName: name });
    error.value = null;
    isPending.value = false;

    return res;
  } catch (err) {
    console.log(err.message);
    error.value = `Ошибка: ${err.message}`;
    isPending.value = false;
  }
};

const useSignup = () => {
  return { error, signup, isPending };
};

export default useSignup;

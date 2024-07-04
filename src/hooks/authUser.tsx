import { getToken } from '../services/helpers';
import useAuthStore from '../store/userStore'

const useAuth = () => {
    const user = useAuthStore((state) => state.user)
    const kyc = useAuthStore((state) => state.kyc)
    const account = useAuthStore((state) => state.account)
    const saveUser = useAuthStore((state) => state.saveUser)
    const saveKyc = useAuthStore((state) => state.saveKyc)
    const saveAccount = useAuthStore((state) => state.saveAccounts)
    const clearUser = useAuthStore((state) => state.clearUser);
    const clearAccount = useAuthStore((state) => state.clearAccount);
    const token = getToken()
    const isHost = user.account === "host"
    const isLoggedIn = token !== null? true : false
    const userId = user.id
    const nameRow = user.name?.split(" ");
    const firstName = nameRow && nameRow[0]
    const lastName = nameRow && nameRow?.length > 1 && nameRow[1]
    const signOut = () => {
      localStorage.clear();
      sessionStorage.clear();
      clearUser();
    };
  return {
    user,
    userId,
    firstName,
    lastName,
    isLoggedIn,
    kyc,
    isHost,
    token,
    account,
    saveAccount,
    saveKyc,
    saveUser,
    clearAccount,
    signOut
  }
}

export default useAuth
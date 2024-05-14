import useStayStore from "@/store/stayStore";


const useStay = () => {
    const stay = useStayStore((state) => state.stay)
    const saveStay = useStayStore((state) => state.saveStay)
    const clearStay = useStayStore((state) => state.clearStay);
  return {
    stay,
    saveStay,
    clearStay
  }
}

export default useStay
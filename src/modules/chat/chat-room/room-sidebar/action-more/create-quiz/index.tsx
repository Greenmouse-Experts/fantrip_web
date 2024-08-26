import { FC } from "react";

interface Props {
    socket: any;
    reload: () => void;
    close: () => void;
  }
const CreateQuiz:FC<Props> = ({}) => {
  return (
    <div>CreateQuiz</div>
  )
}

export default CreateQuiz
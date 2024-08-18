import { Header } from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState, update } from "../features/store";
import { BookreviewList } from "../components/BookreviewList";
import { Link } from "react-router-dom";

export const Bookreview = () => {
  const auth = useSelector(
    (state: RootState) => state.auth.isSignIn
  );
  const offset = useSelector(
    (state: RootState) => state.bookreviewOffset.offset
  );
  const dispatch = useDispatch();

  const handlePrevBtn = () => {
    dispatch(
      update({
        offset: offset - 10,
      })
    );
  };

  const handleNextBtn = () => {
    dispatch(
      update({
        offset: offset + 10,
      })
    );
  };

  return (
    <>
      <Header />
      <main>
        {auth && <div><Link to="/new" className="mb-4">新規書籍投稿</Link></div>}
        <BookreviewList />
        <div className="flex gap-x-2 mt-2 mx-auto">
          <button
            disabled={offset < 1}
            onClick={handlePrevBtn}
            className={"disabled:bg-blue-300"}
          >
            前へ
          </button>
          <button onClick={handleNextBtn}>次へ</button>
        </div>
      </main>
    </>
  );
};

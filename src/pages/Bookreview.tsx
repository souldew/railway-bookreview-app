import { Header } from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState, update } from "../features/bookreviewSlice";
import { BookreviewList } from "../components/BookreviewList";

export const Bookreview = () => {
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

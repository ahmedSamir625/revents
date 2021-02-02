// whenever creating hook it's prefered to start is with "use" word

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../async/asyncReducer";
import { dataFromSnapshot } from "../firestore/firestoreService";

const useFirestoreDoc = ({
  query,
  data,
  dependencies,
  shouldExecute = true,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!shouldExecute) return;

    dispatch(asyncActionStart());
    const unsubscribe = query().onSnapshot(
      (snapshot) => {
        if (!snapshot.exists) {
          dispatch(
            asyncActionError({
              code: "not-found",
              message: "Could not find the document",
            })
          );
          return;
        }
        data(dataFromSnapshot(snapshot));
        dispatch(asyncActionFinish());
      },
      (error) => dispatch(asyncActionError(error))
    );

    return () => {
      unsubscribe();
    };
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useFirestoreDoc;

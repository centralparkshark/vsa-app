import { create } from "zustand";

const store = set => ({
    loader: true,
    isLoggedIn: false,
    setLoginStatus: status => 
    set ({
        isLoggedIn: status,
        loader:false,
    }, false,
    "setLoginStatus"
    ),
});

const useStore = create(store);

export default useStore;
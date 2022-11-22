import { useState, createContext, useEffect } from "react";

export const FetchContext = createContext();

export const FetchProvider = ({ children }) => {
	const [isRandomMemeFetching, setIsRandomMemeFetching] = useState(false);
	const [isRandomJokeFetching, setIsRandomJokeFetching] = useState(false);

	const setFetching = (value, what) => {
		switch (what) {
			case "joke":
				setIsRandomJokeFetching(value);
				break;
			case "meme":
				setIsRandomMemeFetching(value);
				break;
			default:
				break;
		}
	};

	const isFetching = {
		joke: isRandomJokeFetching,
		meme: isRandomMemeFetching,
	};

	return (
		<FetchContext.Provider value={{ isFetching, setFetching }}>
			{children}
		</FetchContext.Provider>
	);
};

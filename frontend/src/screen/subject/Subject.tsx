import React, { memo, useState } from "react";
import SearchBar from "../../components/SerachBaar/SearchBar";

const Subject = () => {
  const [searchText, setSearchText] = useState<string>("");
  const onSearchPress = () => {};
  return (
    <div style={{ padding: 20 }}>
      <div>
        <SearchBar
          value={searchText}
          setValue={setSearchText}
          onSearch={onSearchPress}
        />
      </div>
    </div>
  );
};

export default memo(Subject);

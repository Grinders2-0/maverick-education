import React, { memo, useState } from "react";
import SearchBar from "../../components/SerachBaar/SearchBar";
import ShowSubject from "../../components/Subject/ShowSubject";

const Subject = () => {
  const [searchText, setSearchText] = useState<string>("");
  const onSearchPress = () => {};
  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <SearchBar
          value={searchText}
          setValue={setSearchText}
          onSearch={onSearchPress}
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        />
      </div>
      <div>
        <ShowSubject />
      </div>
    </div>
  );
};

export default memo(Subject);

import React, { memo, useState } from "react";
import SearchBar from "../../components/SerachBaar/SearchBar";
import ShowSubject from "../../components/Subject/ShowSubject";
import { colors } from "../../util/constant/colors";

const Course = () => {
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
      <div style={{ marginTop: 50, display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "90%",
            height: "100%",
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]?.map(
            (item, index) => {
              return (
                <div key={index} style={{}}>
                  <ShowSubject
                    scode="3160707"
                    sname="Comiler Design"
                    style={{ marginRight: 10, marginBottom: 20 }}
                  />
                </div>
              );
            }
          )}
        </div>

        <div
          style={{
            background: colors.red,
            flex: 1,
            height: "100vh",
          }}
        >
          <label>hi</label>
        </div>
      </div>
    </div>
  );
};

export default memo(Course);

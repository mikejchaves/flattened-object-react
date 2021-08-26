import React from "react";
import { useEffect, useReducer } from "react";
import { ascend, descend, prop, sort } from "ramda";

//sort the table columns in by data key
function sortedTableReducer(oldState, newState) {
  const { isDescending, key, table } = { ...oldState, ...newState };
  const direction = isDescending ? descend : ascend;
  const sortFunc = sort(direction(prop(key)));
  return { isDescending, key, table: sortFunc(table) };
}

function useSortedTable(table, key, isDescending = true) {
  const initialState = { isDescending, key, table };
  const [state, dispatch] = useReducer(sortedTableReducer, initialState);
  useEffect(function callDispatchOnceToTriggerInitialSort() {
    dispatch({});
  }, []);
  return [state, dispatch];
}

function SortTh({ label, sortKey, data, dispatch }) {
  function toggleDirAndSetKey() {
    dispatch({ key: sortKey });
    dispatch({ isDescending: !data.isDescending });
  }
  function setKeyOrToggleDir() {
    if (data.key === sortKey) {
      dispatch({ isDescending: !data.isDescending });
    } else {
      dispatch({ key: sortKey });
    }
  }
  return (
    <th>
      <button onClick={setKeyOrToggleDir}>{label}</button>
      <button
        onClick={toggleDirAndSetKey}
        style={{ opacity: data.key === sortKey ? "1" : "0" }}
      >
        {data.isDescending ? (
          <span role="img" aria-label="descending">
            ↓
          </span>
        ) : (
          <span role="img" aria-label="ascending">
            ↑
          </span>
        )}
      </button>
    </th>
  );
}

const Location = ({ data }) => {
  //flattens the JSON respsonse object.
  const flattenJSON = (data = {}, res = {}, extraKey = "") => {
    for (const key in data) {
      if (typeof data[key] !== "object") {
        res[extraKey + key] = data[key];
      } else {
        flattenJSON(data[key], res, `${extraKey}${key}.`);
      }
    }
    return res;
  };
  console.log(flattenJSON(data));
  flattenJSON(data);

  const [sorted, sortDispatch] = useSortedTable(data, "location.country");

  //returns a table that has columns from the flattened object keys and rows with the flattened object values.
  return (
    data.length > 0 && (
      <div className="container">
        <table border={2} cellPadding={5} className="table-sortable">
          <thead>
            <tr>
              <SortTh
                data={sorted}
                sortKey="location.street.number"
                label="Street Number"
                dispatch={sortDispatch}
              />
              <SortTh
                data={sorted}
                sortKey="location.street.name"
                label="Street Name"
                dispatch={sortDispatch}
              />
              <SortTh
                data={sorted}
                sortKey="location.city"
                label="City"
                dispatch={sortDispatch}
              />
              <SortTh
                data={sorted}
                sortKey="location.state"
                label="State"
                dispatch={sortDispatch}
              />
              <SortTh
                data={sorted}
                sortKey="location.country"
                label="Country"
                dispatch={sortDispatch}
              />
              <SortTh
                data={sorted}
                sortKey="location.postcode"
                label="Postcode"
                dispatch={sortDispatch}
              />
              <SortTh
                data={sorted}
                sortKey="location.coordinates.latitude"
                label="Latitude"
                dispatch={sortDispatch}
              />
              <SortTh
                data={sorted}
                sortKey="location.coordinates.longitude"
                label="Longitude"
                dispatch={sortDispatch}
              />
              <SortTh
                data={sorted}
                sortKey="location.timezone.offset"
                label="Timezone Offset"
                dispatch={sortDispatch}
              />
              <SortTh
                data={sorted}
                sortKey="location.timezone.description"
                label="Timezone Description"
                dispatch={sortDispatch}
              />
            </tr>
          </thead>
          <tbody>
            {sorted.table &&
              data.map((d) => (
                <tr key={d.id}>
                  <td>{d.location.street.number}</td>
                  <td>{d.location.street.name}</td>
                  <td>{d.location.city}</td>
                  <td>{d.location.state}</td>
                  <td>{d.location.country}</td>
                  <td>{d.location.postcode}</td>
                  <td>{d.location.coordinates.latitude}</td>
                  <td>{d.location.coordinates.longitude}</td>
                  <td>{d.location.timezone.offset}</td>
                  <td>{d.location.timezone.description}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default Location;

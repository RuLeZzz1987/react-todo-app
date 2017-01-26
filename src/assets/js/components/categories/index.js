import React, { PropTypes } from "react";
import { Editor } from "../../containers";
import { Category } from "../../containers";
import { CATEGORY } from "../../constants";

const { bool, func, arrayOf, string, object } = PropTypes;

const Categories = ({addCategory, ids, params, isTodoFound}) => {
  return (
    <aside className="categories">
      <section className="editor-area">
        <Editor
          type={CATEGORY}
          placeholder={'Enter category title'}
          add={addCategory}
        />
      </section>
      <CategoryTree ids={ids}>
        {ids.map(id =>
          <Category
            id={id}
            key={id}
            params={params}
            isTodoFound={isTodoFound}
          />
        )}
      </CategoryTree>
    </aside>
  )
};

Categories.propTypes = {
  params: object.isRequired,
  addCategory: func.isRequired,
  ids: arrayOf(string).isRequired,
  isTodoFound: bool.isRequired,
};


export default Categories

const CategoryTree = ({ids, children}) => <section className="categories-tree">{ids.length > 0 && children}</section>;
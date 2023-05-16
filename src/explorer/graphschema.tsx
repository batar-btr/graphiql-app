import React, { useState, useEffect } from 'react';
import { buildClientSchema, getIntrospectionQuery, parse, printSchema } from 'graphql';
import { DocExplorerSVG } from './docsExplorerSvgFields';
import { ISchema } from './typeRoot';
import './Schema.scss';

const GraphqlSchema = () => {
  const [schema, setSchema] = useState<ISchema | null>(null);
  const [type, setType] = useState('Docs');
  const [selectedType, setSelectedType] = useState('Docs');
  const [selectedTitle, setSelectedTitle] = useState<null | string>('Docs');

  const endpoint = 'https://rickandmortyapi.com/graphql';

  const fetchSchema = async () => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: getIntrospectionQuery() }),
      });
      const result = await response.json();
      console.log(result);

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      const schema = buildClientSchema(result.data);
      const stringSchema = printSchema(schema);
      const p = parse(stringSchema);
      schema && console.log(schema.getTypeMap());
      schema && console.log(schema.getQueryType());
      schema && console.log(schema.getMutationType());
      schema && console.log(schema.getType('Characters'));
      console.log(schema);
      setSchema(schema);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSchema();
  }, []);

  const SwitchField = () => {
    if (type === 'Query') {
      const queryPath = schema._typeMap.Query;
      console.log(queryPath);
      return queryFields(queryPath);
    }

    if (type === 'Docs') {
      const queryPath = schema._typeMap.Query.name;

      return (
        <div>
          <h1>{selectedTitle}</h1>
          query:{' '}
          <a
            href="#"
            onClick={() => {
              setType(queryPath);
              setSelectedTitle(queryPath);
              setSelectedType('Docs');
            }}
          >
            {queryPath}
          </a>
        </div>
      );
    }

    if (type[0] === type[0].toLowerCase()) {
      const queryPath = schema._typeMap.Query;
      return detailedField(queryPath);
    }

    if (type === 'Character') {
      const queryPath = schema._typeMap.Character;
      return objectFields(queryPath);
    }

    if (type === 'ID') {
      const queryPath = schema._typeMap.ID;
      return scalarDescription(queryPath);
    }

    return <div>Empty field</div>;
  };

  const scalarDescription = (path) => {
    return (
      <>
        <h1>{selectedTitle}</h1>
        <div>{path.description}</div>
      </>
    );
  };

  const detailedField = (path) => {
    const listType = Object.values(path._fields).filter((item) => item.name === type);
    return <ul>{listType.map((item) => specificFields(item))}</ul>;
  };

  const objectFields = (path) => {
    const listType = Object.values(path._fields);
    return (
      <ul className="args">
        <h1>{selectedTitle}</h1>
        <div>
          <DocExplorerSVG /> Fields
        </div>
        {listType.map((item) => graphQLObjectTypeFields(item))}
      </ul>
    );
  };

  const graphQLObjectTypeFields = (item) => {
    console.log(item);

    return (
      <li key={item.name}>
        {graphQLObjectTypeSpan(item)}: {graphQLObjectScalarLink(item)}
        <div>{item.description}</div>
      </li>
    );
  };

  const graphQLObjectTypeSpan = (item) => {
    return <span className="field">{item.name}</span>;
  };

  const graphQLObjectScalarLink = (item) => {
    return (
      <>
        <a
          href="#"
          className="scalar"
          onClick={(e) => {
            e.preventDefault();
            setSelectedTitle(item.type.name);
            setType(item.type.name);
          }}
        >
          <span>{item.type.name}</span>
        </a>
      </>
    );
  };

  const queryFields = (path) => {
    const listType = Object.values(path._fields);
    return (
      <ul className="args">
        <h1>{selectedTitle}</h1>
        <div>
          <DocExplorerSVG /> Fields
        </div>
        {listType.map((item) => typeFields(item))}
      </ul>
    );
  };

  const specificFields = (item) => {
    return (
      <li key={item.name}>
        <div>{item.description}</div>

        <div>Type</div>
        {objectLink(item)}

        <div>Args</div>
        {specificArgs(item.args)}
      </li>
    );
  };

  const typeFields = (item) => {
    return (
      <li key={item.name}>
        {typeLink(item)}({specificArgs(item.args)}):
        <div>{item.description}</div>
      </li>
    );
  };

  const typeLink = (item) => {
    return (
      <a
        href="#"
        className="field"
        onClick={(e) => {
          e.preventDefault();
          setSelectedTitle(item.name);
          setType(item.name);
        }}
      >
        {item.name}
      </a>
    );
  };

  const objectLink = (item) => {
    console.log(item);

    return (
      <>
        <a
          href="#"
          className="scalar"
          onClick={(e) => {
            e.preventDefault();
            setSelectedTitle(item.type.name);
            setType(item.type.name);
          }}
        >
          <div>{item.type.name}</div>
        </a>
      </>
    );
  };

  const specificArgs = (items) => {
    const argumentsClassName = items.length > 1 ? 'arg' : 'args';
    return (
      <ul className={argumentsClassName}>
        {items.map((item) => {
          console.log(item);

          if (item.name === 'id') {
            return (
              <li key={item.name}>
                {item.name}:{' '}
                {
                  <a
                    href="#"
                    className="scalar"
                    onClick={(e) => {
                      e.preventDefault();
                      setType(item.name.toUpperCase());
                    }}
                  >
                    {item.name.toUpperCase()}
                  </a>
                }
                !
              </li>
            );
          } else if (item.name === 'ids') {
            return (
              <li key={item.name}>
                {item.name}: [
                {
                  <a
                    href="#"
                    className="scalar"
                    onClick={(e) => {
                      e.preventDefault();
                      setType(item.name.toUpperCase().slice(0, 2));
                    }}
                  >
                    {item.name.toUpperCase().slice(0, 2)}
                  </a>
                }
                !]!
              </li>
            );
          } else {
            return (
              <li key={item.name}>
                {item.name}:{' '}
                {
                  <a
                    href="#"
                    className="scalar"
                    onClick={(e) => {
                      e.preventDefault();
                      setType(item.type.name);
                    }}
                  >
                    {item.type.name}
                  </a>
                }
              </li>
            );
          }
        })}
      </ul>
    );
  };

  return (
    schema && (
      <>
        {
          <a
            href="#"
            className="back"
            onClick={(e) => {
              e.preventDefault();
              setType(selectedType);

              setSelectedTitle(type);
            }}
          >
            {selectedTitle}
          </a>
        }
        <div>{<SwitchField />}</div>
      </>
    )
  );
};

export default GraphqlSchema;

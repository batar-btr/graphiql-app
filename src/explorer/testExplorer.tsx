import { useState, useEffect } from 'react';
import {
  buildClientSchema,
  getIntrospectionQuery,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLScalarType,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import { DocsExplorerFieldSvg } from './docsExplorerSvgFields';
import { DocsExplorerRootSvg } from './docsExplorerRootSvg';
import { DocsExplorerTypeSvg } from './doscExplorerTypeSvg';
import { DocsExplorerArgumentsSvg } from './docsExplorerArgumentsSvg';

import { Link } from 'react-router-dom';
import { QueryMain, QueryField, Fields } from './typeRoot';
import { QueryArray, Query } from './types';

import './Schema.scss';

export const DocumentationExplorer = () => {
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [type, setType] = useState('Docs');
  const [selectedType, setSelectedType] = useState<string>('Query');
  const [selectedTitle, setSelectedTitle] = useState<string>('Docs');
  const [backStack, setBackStack] = useState<string[] | []>([]);

  const endpoint = 'https://rickandmortyapi.com/graphql';

  const fetchSchema = async () => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: getIntrospectionQuery() }),
      });
      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      const schema = buildClientSchema(result.data);

      setSchema(schema);
    } catch (err) {
      console.error(err);
    }
  };

  const DefaultDocs = () => {
    return (
      <div className="docs">
        <div className="docs-root-header">
          <div className="docs-root-header-title">{selectedTitle}</div>
        </div>
        <div className="docs-root-description">
          A GraphQL schema provides a root type for each kind of operation.
        </div>
        <div className="docs-root">
          <div className="docs-root-types">
            <DocsExplorerRootSvg />
            Root Types
          </div>
          <div className="docs-root-content">
            <span className="docs-root-field">query</span>:{' '}
            <a
              className="docs-root-scalar"
              href="#"
              onClick={() => {
                setSelectedTitle('Query');
                setSelectedType('Query');
                setType('Query');
              }}
            >
              {selectedType}
            </a>
          </div>
        </div>
      </div>
    );
  };

  const Fields = () => {
    const typeByName = schema && schema.getType(type);

    if (typeByName instanceof GraphQLObjectType || typeByName instanceof GraphQLInputObjectType) {
      return objectType(typeByName);
    } else if (typeByName instanceof GraphQLScalarType) {
      return scalarObjectType();
    } else {
      return currentField();
    }
  };

  const objectType = (value: GraphQLObjectType | GraphQLInputObjectType) => {
    const fields = value.getFields();
    setSelectedType(type);

    const array = Object.values(fields);

    return (
      <>
        <div className="docs-root-header">
          <div className="docs-root-header-title">{selectedTitle}</div>
        </div>
        <div className="docs-root">
          <div className="docs-root-types">
            <DocsExplorerFieldSvg />
            Fields:
          </div>
        </div>
        <ul>
          {array.map((item) => {
            return (
              <li key={item.name}>
                <Link
                  to="/graphiql"
                  onClick={() => {
                    setSelectedTitle(item.name);
                    setType(item.name);
                  }}
                >
                  {item.name}
                </Link>{' '}
                {item.args && item.args.length > 0 && (
                  <>
                    {'('}
                    {fieldArguments(item)}
                    {')'}
                  </>
                )}
                : {graphQLListType(item)}
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  const graphQLListType = (item) => {
    if (item.type instanceof GraphQLList) {
      return (
        <>
          {'['}
          <Link
            to="/graphiql"
            onClick={() => {
              setSelectedTitle(item.type.ofType.name);
              setSelectedType(item.type.ofType.name);
              setType(item.type.ofType.name);
            }}
          >
            {item.type.ofType.name}
          </Link>
          {']'}
        </>
      );
    } else if (item.type instanceof GraphQLNonNull) {
      return (
        <>
          {'['}
          <Link
            to="/graphiql"
            onClick={() => {
              setSelectedTitle(item.type.ofType.ofType.name);
              setSelectedType(item.type.ofType.ofType.name);
              setType(item.type.ofType.ofType.name);
            }}
          >
            {item.type.ofType.ofType.name}
          </Link>
          {']!'}
        </>
      );
    } else {
      return (
        <Link
          to="/graphiql"
          onClick={() => {
            setSelectedTitle(item.type.name);
            setType(item.type.name);
            setSelectedType(item.type.name);
          }}
        >
          {item.type.name}
        </Link>
      );
    }
  };

  const currentField = () => {
    const field = schema && schema.getType(selectedType);

    if (field instanceof GraphQLObjectType || field instanceof GraphQLInputObjectType) {
      const fields = field.getFields();
      const array = Object.values(fields);
      const current = array.filter((item) => item.name === type)[0];

      return (
        <>
          <div className="docs-root-header">
            <div className="docs-root-header-title">{selectedTitle}</div>
          </div>
          {isTypeCurrentField(current)}
          {current.args && current.args.length > 0 && (
            <div>
              <div className="docs-root">
                <div className="docs-root-types">
                  <DocsExplorerArgumentsSvg />
                  Arguments:
                </div>
              </div>
              {fieldArguments(current)}
            </div>
          )}
        </>
      );
    }
  };

  const fieldArguments = (current) => {
    return (
      <>
        {current.args.map((arg) => {
          if (arg.type.ofType instanceof GraphQLList) {
            return (
              <div key={arg.name}>
                {arg.name}: {'['}
                {
                  <Link
                    to="/graphiql"
                    onClick={() => {
                      setSelectedTitle(arg.type.ofType.ofType.ofType.name);
                      setType(arg.type.ofType.ofType.ofType.name);
                    }}
                  >
                    <span>{arg.type.ofType.ofType.ofType.name}</span>
                  </Link>
                }
                {'!'}
                {']'}
                {'!'}
              </div>
            );
          } else if (arg.type.ofType instanceof GraphQLScalarType) {
            return (
              <div key={arg.name}>
                {arg.name}:{' '}
                {
                  <Link
                    to="/graphiql"
                    onClick={() => {
                      setSelectedTitle(arg.type.ofType.name);
                      setType(arg.type.ofType.name);
                    }}
                  >
                    <span>{arg.type.ofType.name}</span>
                  </Link>
                }
                {'!'}
              </div>
            );
          } else {
            return (
              <div key={arg.name}>
                {arg.name}:{' '}
                {
                  <Link
                    to="/graphiql"
                    onClick={() => {
                      setSelectedTitle(arg.type.name);
                      setType(arg.type.name);
                    }}
                  >
                    <span>{arg.type.name}</span>
                  </Link>
                }
              </div>
            );
          }
        })}
      </>
    );
  };

  const isTypeCurrentField = (current) => {
    if (current.type instanceof GraphQLList) {
      return (
        <>
          {current.description}
          <div className="docs-root">
            <div className="docs-root-types">
              <DocsExplorerTypeSvg />
              Type
            </div>
          </div>
          {'['}
          <Link
            to="/graphiql"
            onClick={() => {
              setSelectedTitle(current.type.ofType.name);
              setType(current.type.ofType.name);
            }}
          >
            {current.type.ofType.name}
          </Link>
          {']'}
        </>
      );
    } else if (current.type instanceof GraphQLScalarType) {
      return (
        <div>
          {current.description}
          <div className="docs-root">
            <div className="docs-root-types">
              <DocsExplorerTypeSvg />
              Type
            </div>
          </div>
          <Link
            to="/graphiql"
            onClick={() => {
              setSelectedTitle(current.type.name);
              setType(current.type.name);
            }}
          >
            {current.type.name}
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          {current.description}
          <div className="docs-root">
            <div className="docs-root-types">
              <DocsExplorerTypeSvg />
              Type
            </div>
          </div>
          <Link
            to="/graphiql"
            onClick={() => {
              setSelectedTitle(current.type.name);
              setType(current.type.name);
            }}
          >
            {current.type.name}
          </Link>
        </div>
      );
    }
  };

  const scalarObjectType = () => {
    const description = schema && schema.getType(type);

    return (
      <>
        <div className="docs-root-header">
          <div className="docs-root-header-title">{selectedTitle}</div>
        </div>
        <div className="docs-root-description">{description?.description}</div>
      </>
    );
  };

  useEffect(() => {
    fetchSchema();
  }, []);

  const Docs = () => {
    return type === 'Docs' ? <DefaultDocs /> : <div>{Fields()}</div>;
  };

  return (
    schema && (
      <>
        {/* {type === 'Docs' ? null : (
          <a
            href="#"
            className="back"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {selectedTitle}
          </a>
        )} */}
        <div>{<Docs />}</div>
      </>
    )
  );
};

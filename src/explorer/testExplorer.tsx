import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
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

import { GraphQLNestedList, GraphQLObject, DocumentationRickAndMorty } from '../service/types';
import { fetchSchema } from '../service/fetchSchema';
import './Schema.scss';

export const DocumentationExplorer = () => {
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  // const [type, setType] = useState<string>('Docs');
  // const [selectedType, setSelectedType] = useState<string>('Query');
  // const [selectedTitle, setSelectedTitle] = useState<string>('Docs');
  const [backStack, setBackStack] = useState<DocumentationRickAndMorty[] | []>([]);
  const [documentation, setDocumentation] = useState({
    type: 'Docs',
    selectedType: 'Query',
    title: 'Docs',
  });

  const DefaultDocs = () => {
    return (
      <div className="docs">
        <div className="docs-root-header">
          <div className="docs-root-header-title">{documentation.title}</div>
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
                setDocumentation({ type: 'Query', selectedType: 'Query', title: 'Query' });
                setBackStack((prevStack) => [
                  ...prevStack,
                  { type: 'Query', selectedType: 'Query', title: 'Query' },
                ]);
              }}
            >
              {documentation.selectedType}
            </a>
          </div>
        </div>
      </div>
    );
  };

  const Fields = () => {
    const typeByName = schema && schema.getType(documentation.type);

    if (typeByName instanceof GraphQLObjectType || typeByName instanceof GraphQLInputObjectType) {
      return objectType(typeByName);
    } else if (typeByName instanceof GraphQLScalarType) {
      return <ScalarObjectType />;
    } else {
      return <CurrentField selected={documentation.selectedType} />;
    }
  };

  const objectType = (value: GraphQLObjectType | GraphQLInputObjectType) => {
    const fields = value.getFields();

    const array = Object.values(fields);

    return (
      <>
        <div className="docs-root-header">
          <div className="docs-root-header-title">{documentation.title}</div>
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
                    setDocumentation((prev) => ({ ...prev, type: item.name, title: item.name }));

                    setBackStack((prevStack) => [
                      ...prevStack,
                      {
                        type: item.name,
                        selectedType: documentation.selectedType,
                        title: item.name,
                      },
                    ]);
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
                {item.description && <div>{item.description}</div>}
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  const graphQLListType = (item: GraphQLNestedList) => {
    if (item.type instanceof GraphQLList) {
      return (
        <>
          {'['}
          <Link
            to="/graphiql"
            onClick={() => {
              setDocumentation({
                type: item.type.ofType.name,
                selectedType: item.type.ofType.name,
                title: item.type.ofType.name,
              });

              setBackStack((prevStack) => [
                ...prevStack,
                {
                  type: item.type.ofType.name,
                  selectedType: item.type.ofType.name,
                  title: item.type.ofType.name,
                },
              ]);
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
              setDocumentation({
                type: item.type.ofType.ofType.name,
                selectedType: item.type.ofType.ofType.name,
                title: item.type.ofType.ofType.name,
              });

              setBackStack((prevStack) => [
                ...prevStack,
                {
                  type: item.type.ofType.ofType.name,
                  selectedType: item.type.ofType.ofType.name,
                  title: item.type.ofType.ofType.name,
                },
              ]);
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
            setDocumentation({
              type: item.type.name,
              selectedType: item.type.name,
              title: item.type.name,
            });

            setBackStack((prevStack) => [
              ...prevStack,
              {
                type: item.type.name,
                selectedType: item.type.name,
                title: item.type.name,
              },
            ]);
          }}
        >
          {item.type.name}
        </Link>
      );
    }
  };

  const CurrentField = ({ selected }: { selected: string }) => {
    const field = schema && (schema.getType(selected) as GraphQLObject);
    const fields = field!.getFields();
    const array: GraphQLNestedList[] = Object.values(fields);
    const current = array.find((item) => item.name === documentation.type);

    return (
      <>
        <div className="docs-root-header">
          <div className="docs-root-header-title">{documentation.title}</div>
        </div>
        {current && isTypeCurrentField(current)}
        {current && current.args && current.args.length > 0 && (
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
  };

  const fieldArguments = (current: GraphQLNestedList) => {
    return (
      <>
        {current.args.map((arg) => {
          if (arg.type instanceof GraphQLInputObjectType) {
            return (
              <div key={arg.name}>
                {arg.name}:
                {
                  <Link
                    to="/graphiql"
                    onClick={() => {
                      setDocumentation({
                        type: arg.type.name,
                        selectedType: arg.type.name,
                        title: arg.type.name,
                      });

                      setBackStack((prevStack) => [
                        ...prevStack,
                        {
                          type: arg.type.name,
                          selectedType: arg.type.name,
                          title: arg.type.name,
                        },
                      ]);
                    }}
                  >
                    <span>{arg.type.name}</span>
                  </Link>
                }
              </div>
            );
          } else {
            if (arg.type.ofType instanceof GraphQLList) {
              return (
                <div key={arg.name}>
                  {arg.name}: {'['}
                  {
                    <Link
                      to="/graphiql"
                      onClick={() => {
                        setDocumentation((prev) => ({
                          ...prev,
                          type: arg.type.ofType.ofType.ofType.name,
                          title: arg.type.ofType.ofType.ofType.name,
                        }));

                        setBackStack((prevStack) => [
                          ...prevStack,
                          {
                            type: arg.type.ofType.ofType.ofType.name,
                            selectedType: documentation.selectedType,
                            title: arg.type.ofType.ofType.ofType.name,
                          },
                        ]);
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
                        setDocumentation((prev) => ({
                          ...prev,
                          type: arg.type.ofType.name,
                          title: arg.type.ofType.name,
                        }));

                        setBackStack((prevStack) => [
                          ...prevStack,
                          {
                            type: arg.type.ofType.name,
                            selectedType: documentation.selectedType,
                            title: arg.type.ofType.name,
                          },
                        ]);
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
                        setDocumentation((prev) => ({
                          ...prev,
                          type: arg.type.name,
                          title: arg.type.name,
                        }));
                        setBackStack((prevStack) => [
                          ...prevStack,
                          {
                            type: arg.type.name,
                            selectedType: documentation.selectedType,
                            title: arg.type.name,
                          },
                        ]);
                      }}
                    >
                      <span>{arg.type.name}</span>
                    </Link>
                  }
                </div>
              );
            }
          }
        })}
      </>
    );
  };

  const isTypeCurrentField = (current: GraphQLNestedList) => {
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
              setDocumentation({
                selectedType: current.type.ofType.name,
                type: current.type.ofType.name,
                title: current.type.ofType.name,
              });
              setBackStack((prevStack) => [
                ...prevStack,
                {
                  selectedType: current.type.ofType.name,
                  type: current.type.ofType.name,
                  title: current.type.ofType.name,
                },
              ]);
            }}
          >
            {current.type.ofType.name}
          </Link>
          {']'}
        </>
      );
    } else if (current.type instanceof GraphQLNonNull) {
      return (
        <div>
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
              setDocumentation({
                type: current.type.ofType.ofType.name,
                selectedType: current.type.ofType.ofType.name,
                title: current.type.ofType.ofType.name,
              });
              setBackStack((prevStack) => [
                ...prevStack,
                {
                  type: current.type.ofType.ofType.name,
                  selectedType: current.type.ofType.ofType.name,
                  title: current.type.ofType.ofType.name,
                },
              ]);
            }}
          >
            {current.type.ofType.ofType.name}
          </Link>
          {']!'}
        </div>
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
              setDocumentation((prev) => ({
                ...prev,
                type: current.type.name,
                title: current.type.name,
              }));

              setBackStack((prevStack) => [
                ...prevStack,
                {
                  type: current.type.name,
                  selectedType: documentation.selectedType,
                  title: current.type.name,
                },
              ]);
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
              setDocumentation({
                type: current.type.name,
                selectedType: current.type.name,
                title: current.type.name,
              });
              setBackStack((prevStack) => [
                ...prevStack,
                {
                  type: current.type.name,
                  selectedType: current.type.name,
                  title: current.type.name,
                },
              ]);
            }}
          >
            {current.type.name}
          </Link>
        </div>
      );
    }
  };

  const ScalarObjectType = () => {
    const description = schema && schema.getType(documentation.type);

    return (
      <>
        <div className="docs-root-header">
          <div className="docs-root-header-title">{documentation.title}</div>
        </div>
        <div className="docs-root-description">{description?.description}</div>
      </>
    );
  };

  useEffect(() => {
    fetchSchema().then((s) => s && setSchema(s));
  }, []);

  const reversePage = () => {
    if (backStack.length === 1) {
      if (documentation.selectedType === 'Query') {
        setDocumentation({
          type: 'Docs',
          selectedType: 'Query',
          title: 'Docs',
        });
        setBackStack([]);
      } else {
        setDocumentation(backStack[0]);
        setBackStack([]);
      }
    } else if (backStack.length === 2) {
      setDocumentation(backStack[0]);
      setBackStack(backStack.slice(0, -1));
    } else {
      setDocumentation(backStack[backStack.length - 2]);
      setBackStack(backStack.slice(0, -1));
    }
  };

  const Docs = () => (documentation.type === 'Docs' ? <DefaultDocs /> : <Fields />);
  return (
    schema && (
      <>
        {documentation.type === 'Docs' ? null : (
          <a
            href="#"
            className="back"
            onClick={(e) => {
              e.preventDefault();
              reversePage();
            }}
          >
            {backStack.length === 1 ? 'Docs' : backStack[backStack.length - 2].type}
          </a>
        )}
        <div>{<Docs />}</div>
      </>
    )
  );
};

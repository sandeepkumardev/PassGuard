import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Domain = {
  __typename?: 'Domain';
  createdAt?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  usedPW?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type Domain_Input = {
  __typename?: 'Domain_Input';
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addPassword: AffectedRows;
  destroyDomain: AffectedRows;
  isPasswordExist: AffectedRows;
  newDomain?: Maybe<Domain>;
  removeDomain: AffectedRows;
};


export type MutationAddPasswordArgs = {
  id: Scalars['ID']['input'];
  password: Scalars['String']['input'];
};


export type MutationDestroyDomainArgs = {
  id: Scalars['ID']['input'];
};


export type MutationIsPasswordExistArgs = {
  id: Scalars['ID']['input'];
  password: Scalars['String']['input'];
};


export type MutationNewDomainArgs = {
  name: Scalars['String']['input'];
};


export type MutationRemoveDomainArgs = {
  id: Scalars['ID']['input'];
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  domains: Array<Maybe<Domain>>;
};


export type QueryDomainsArgs = {
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AffectedRows = {
  __typename?: 'affectedRows';
  affectedCount: Scalars['Int']['output'];
};

export type NewDomainOutput = {
  __typename?: 'newDomainOutput';
  data: Domain;
};

export type GetDomainsQueryVariables = Exact<{
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetDomainsQuery = { __typename?: 'Query', domains: Array<{ __typename?: 'Domain', id?: string | null, name?: string | null, usedPW?: Array<string | null> | null, password?: string | null, createdAt?: string | null, updatedAt?: string | null, deletedAt?: string | null } | null> };

export type NewDomainMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type NewDomainMutation = { __typename?: 'Mutation', newDomain?: { __typename?: 'Domain', id?: string | null, name?: string | null, usedPW?: Array<string | null> | null, password?: string | null, createdAt?: string | null, updatedAt?: string | null, deletedAt?: string | null } | null };

export type IsPasswordExistMutationVariables = Exact<{
  isPasswordExistId: Scalars['ID']['input'];
  password: Scalars['String']['input'];
}>;


export type IsPasswordExistMutation = { __typename?: 'Mutation', isPasswordExist: { __typename?: 'affectedRows', affectedCount: number } };

export type AddPasswordMutationVariables = Exact<{
  addPasswordId: Scalars['ID']['input'];
  password: Scalars['String']['input'];
}>;


export type AddPasswordMutation = { __typename?: 'Mutation', addPassword: { __typename?: 'affectedRows', affectedCount: number } };

export type RemoveDomainMutationVariables = Exact<{
  removeDomainId: Scalars['ID']['input'];
  password: Scalars['String']['input'];
}>;


export type RemoveDomainMutation = { __typename?: 'Mutation', removeDomain: { __typename?: 'affectedRows', affectedCount: number } };

export type DeleteDomainMutationVariables = Exact<{
  deleteDomainId: Scalars['ID']['input'];
}>;


export type DeleteDomainMutation = { __typename?: 'Mutation', destroyDomain: { __typename?: 'affectedRows', affectedCount: number } };


export const GetDomainsDocument = gql`
    query GetDomains($isDeleted: Boolean) {
  domains(isDeleted: $isDeleted) {
    id
    name
    usedPW
    password
    createdAt
    updatedAt
    deletedAt
  }
}
    `;

/**
 * __useGetDomainsQuery__
 *
 * To run a query within a React component, call `useGetDomainsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDomainsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDomainsQuery({
 *   variables: {
 *      isDeleted: // value for 'isDeleted'
 *   },
 * });
 */
export function useGetDomainsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetDomainsQuery, GetDomainsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetDomainsQuery, GetDomainsQueryVariables>(GetDomainsDocument, options);
      }
export function useGetDomainsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDomainsQuery, GetDomainsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetDomainsQuery, GetDomainsQueryVariables>(GetDomainsDocument, options);
        }
export function useGetDomainsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetDomainsQuery, GetDomainsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetDomainsQuery, GetDomainsQueryVariables>(GetDomainsDocument, options);
        }
export type GetDomainsQueryHookResult = ReturnType<typeof useGetDomainsQuery>;
export type GetDomainsLazyQueryHookResult = ReturnType<typeof useGetDomainsLazyQuery>;
export type GetDomainsSuspenseQueryHookResult = ReturnType<typeof useGetDomainsSuspenseQuery>;
export type GetDomainsQueryResult = Apollo.QueryResult<GetDomainsQuery, GetDomainsQueryVariables>;
export const NewDomainDocument = gql`
    mutation NewDomain($name: String!) {
  newDomain(name: $name) {
    id
    name
    usedPW
    password
    createdAt
    updatedAt
    deletedAt
  }
}
    `;
export type NewDomainMutationFn = Apollo.MutationFunction<NewDomainMutation, NewDomainMutationVariables>;

/**
 * __useNewDomainMutation__
 *
 * To run a mutation, you first call `useNewDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newDomainMutation, { data, loading, error }] = useNewDomainMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useNewDomainMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<NewDomainMutation, NewDomainMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<NewDomainMutation, NewDomainMutationVariables>(NewDomainDocument, options);
      }
export type NewDomainMutationHookResult = ReturnType<typeof useNewDomainMutation>;
export type NewDomainMutationResult = Apollo.MutationResult<NewDomainMutation>;
export type NewDomainMutationOptions = Apollo.BaseMutationOptions<NewDomainMutation, NewDomainMutationVariables>;
export const IsPasswordExistDocument = gql`
    mutation IsPasswordExist($isPasswordExistId: ID!, $password: String!) {
  isPasswordExist(id: $isPasswordExistId, password: $password) {
    affectedCount
  }
}
    `;
export type IsPasswordExistMutationFn = Apollo.MutationFunction<IsPasswordExistMutation, IsPasswordExistMutationVariables>;

/**
 * __useIsPasswordExistMutation__
 *
 * To run a mutation, you first call `useIsPasswordExistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIsPasswordExistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [isPasswordExistMutation, { data, loading, error }] = useIsPasswordExistMutation({
 *   variables: {
 *      isPasswordExistId: // value for 'isPasswordExistId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useIsPasswordExistMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<IsPasswordExistMutation, IsPasswordExistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<IsPasswordExistMutation, IsPasswordExistMutationVariables>(IsPasswordExistDocument, options);
      }
export type IsPasswordExistMutationHookResult = ReturnType<typeof useIsPasswordExistMutation>;
export type IsPasswordExistMutationResult = Apollo.MutationResult<IsPasswordExistMutation>;
export type IsPasswordExistMutationOptions = Apollo.BaseMutationOptions<IsPasswordExistMutation, IsPasswordExistMutationVariables>;
export const AddPasswordDocument = gql`
    mutation AddPassword($addPasswordId: ID!, $password: String!) {
  addPassword(id: $addPasswordId, password: $password) {
    affectedCount
  }
}
    `;
export type AddPasswordMutationFn = Apollo.MutationFunction<AddPasswordMutation, AddPasswordMutationVariables>;

/**
 * __useAddPasswordMutation__
 *
 * To run a mutation, you first call `useAddPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPasswordMutation, { data, loading, error }] = useAddPasswordMutation({
 *   variables: {
 *      addPasswordId: // value for 'addPasswordId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useAddPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddPasswordMutation, AddPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AddPasswordMutation, AddPasswordMutationVariables>(AddPasswordDocument, options);
      }
export type AddPasswordMutationHookResult = ReturnType<typeof useAddPasswordMutation>;
export type AddPasswordMutationResult = Apollo.MutationResult<AddPasswordMutation>;
export type AddPasswordMutationOptions = Apollo.BaseMutationOptions<AddPasswordMutation, AddPasswordMutationVariables>;
export const RemoveDomainDocument = gql`
    mutation RemoveDomain($removeDomainId: ID!, $password: String!) {
  removeDomain(id: $removeDomainId, password: $password) {
    affectedCount
  }
}
    `;
export type RemoveDomainMutationFn = Apollo.MutationFunction<RemoveDomainMutation, RemoveDomainMutationVariables>;

/**
 * __useRemoveDomainMutation__
 *
 * To run a mutation, you first call `useRemoveDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDomainMutation, { data, loading, error }] = useRemoveDomainMutation({
 *   variables: {
 *      removeDomainId: // value for 'removeDomainId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRemoveDomainMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveDomainMutation, RemoveDomainMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveDomainMutation, RemoveDomainMutationVariables>(RemoveDomainDocument, options);
      }
export type RemoveDomainMutationHookResult = ReturnType<typeof useRemoveDomainMutation>;
export type RemoveDomainMutationResult = Apollo.MutationResult<RemoveDomainMutation>;
export type RemoveDomainMutationOptions = Apollo.BaseMutationOptions<RemoveDomainMutation, RemoveDomainMutationVariables>;
export const DeleteDomainDocument = gql`
    mutation DeleteDomain($deleteDomainId: ID!) {
  destroyDomain(id: $deleteDomainId) {
    affectedCount
  }
}
    `;
export type DeleteDomainMutationFn = Apollo.MutationFunction<DeleteDomainMutation, DeleteDomainMutationVariables>;

/**
 * __useDeleteDomainMutation__
 *
 * To run a mutation, you first call `useDeleteDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDomainMutation, { data, loading, error }] = useDeleteDomainMutation({
 *   variables: {
 *      deleteDomainId: // value for 'deleteDomainId'
 *   },
 * });
 */
export function useDeleteDomainMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteDomainMutation, DeleteDomainMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteDomainMutation, DeleteDomainMutationVariables>(DeleteDomainDocument, options);
      }
export type DeleteDomainMutationHookResult = ReturnType<typeof useDeleteDomainMutation>;
export type DeleteDomainMutationResult = Apollo.MutationResult<DeleteDomainMutation>;
export type DeleteDomainMutationOptions = Apollo.BaseMutationOptions<DeleteDomainMutation, DeleteDomainMutationVariables>;
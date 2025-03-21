--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 17.4 (Ubuntu 17.4-1.pgdg22.04+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: pgsodium; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA pgsodium;


ALTER SCHEMA pgsodium OWNER TO supabase_admin;

--
-- Name: pgsodium; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgsodium WITH SCHEMA pgsodium;


--
-- Name: EXTENSION pgsodium; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgsodium IS 'Pgsodium is a modern cryptography library for Postgres.';


--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: pgjwt; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgjwt WITH SCHEMA extensions;


--
-- Name: EXTENSION pgjwt; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgjwt IS 'JSON Web Token API for Postgresql';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: ActionType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ActionType" AS ENUM (
    'action',
    'extendedAction',
    'reaction'
);


ALTER TYPE public."ActionType" OWNER TO postgres;

--
-- Name: ConditionType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ConditionType" AS ENUM (
    'character',
    'item'
);


ALTER TYPE public."ConditionType" OWNER TO postgres;

--
-- Name: CyberneticType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."CyberneticType" AS ENUM (
    'roll',
    'stat',
    'offensive',
    'defensive',
    'function'
);


ALTER TYPE public."CyberneticType" OWNER TO postgres;

--
-- Name: DurationUnit; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."DurationUnit" AS ENUM (
    'second',
    'minute',
    'hour',
    'day',
    'week',
    'month',
    'year',
    'turn',
    'round',
    'scene',
    'session'
);


ALTER TYPE public."DurationUnit" OWNER TO postgres;

--
-- Name: ItemCategory; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ItemCategory" AS ENUM (
    'reusable',
    'consumable'
);


ALTER TYPE public."ItemCategory" OWNER TO postgres;

--
-- Name: ItemRarity; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ItemRarity" AS ENUM (
    'common',
    'uncommon',
    'rare',
    'blackMarket',
    'artifact'
);


ALTER TYPE public."ItemRarity" OWNER TO postgres;

--
-- Name: ItemSubcategory; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ItemSubcategory" AS ENUM (
    'chemicalTherapy',
    'chemicalAssistance',
    'anomaly',
    'gadget',
    'misc'
);


ALTER TYPE public."ItemSubcategory" OWNER TO postgres;

--
-- Name: KeywordType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."KeywordType" AS ENUM (
    'weapon',
    'armor',
    'cybernetic'
);


ALTER TYPE public."KeywordType" OWNER TO postgres;

--
-- Name: ModifierType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ModifierType" AS ENUM (
    'roll',
    'stat'
);


ALTER TYPE public."ModifierType" OWNER TO postgres;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."UserRole" AS ENUM (
    'GUEST',
    'USER',
    'ADMIN',
    'SUPERADMIN'
);


ALTER TYPE public."UserRole" OWNER TO postgres;

--
-- Name: ValueType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ValueType" AS ENUM (
    'number',
    'attribute',
    'skill'
);


ALTER TYPE public."ValueType" OWNER TO postgres;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: postgres
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO postgres;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: postgres
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: postgres
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    IF EXISTS (
      SELECT 1
      FROM pg_event_trigger_ddl_commands() AS ev
      JOIN pg_extension AS ext
      ON ev.objid = ext.oid
      WHERE ext.extname = 'pg_net'
    )
    THEN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_roles
        WHERE rolname = 'supabase_functions_admin'
      )
      THEN
        CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
      END IF;

      GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

      IF EXISTS (
        SELECT FROM pg_extension
        WHERE extname = 'pg_net'
        -- all versions in use on existing projects as of 2025-02-20
        -- version 0.12.0 onwards don't need these applied
        AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8.0', '0.10.0', '0.11.0')
      ) THEN
        ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
        ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

        ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
        ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

        REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
        REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

        GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
        GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      END IF;
    END IF;
  END;
  $$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO postgres;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: postgres
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: postgres
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    RAISE WARNING 'PgBouncer auth request: %', p_usename;

    RETURN QUERY
    SELECT usename::TEXT, passwd::TEXT FROM pg_catalog.pg_shadow
    WHERE usename = p_usename;
END;
$$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO postgres;

--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  BEGIN
    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (payload, event, topic, private, extension)
    VALUES (payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      PERFORM pg_notify(
          'realtime:system',
          jsonb_build_object(
              'error', SQLERRM,
              'function', 'realtime.send',
              'event', event,
              'topic', topic,
              'private', private
          )::text
      );
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
_filename text;
BEGIN
	select string_to_array(name, '/') into _parts;
	select _parts[array_length(_parts,1)] into _filename;
	-- @todo return the last part instead of 2
	return reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[1:array_length(_parts,1)-1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::int) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE "C" > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                name COLLATE "C" > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE "C" ASC) as e order by name COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) OWNER TO supabase_storage_admin;

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
  v_order_by text;
  v_sort_order text;
begin
  case
    when sortcolumn = 'name' then
      v_order_by = 'name';
    when sortcolumn = 'updated_at' then
      v_order_by = 'updated_at';
    when sortcolumn = 'created_at' then
      v_order_by = 'created_at';
    when sortcolumn = 'last_accessed_at' then
      v_order_by = 'last_accessed_at';
    else
      v_order_by = 'name';
  end case;

  case
    when sortorder = 'asc' then
      v_sort_order = 'asc';
    when sortorder = 'desc' then
      v_sort_order = 'desc';
    else
      v_sort_order = 'asc';
  end case;

  v_order_by = v_order_by || ' ' || v_sort_order;

  return query execute
    'with folders as (
       select path_tokens[$1] as folder
       from storage.objects
         where objects.name ilike $2 || $3 || ''%''
           and bucket_id = $4
           and array_length(objects.path_tokens, 1) <> $1
       group by folder
       order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

--
-- Name: secrets_encrypt_secret_secret(); Type: FUNCTION; Schema: vault; Owner: supabase_admin
--

CREATE FUNCTION vault.secrets_encrypt_secret_secret() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
		BEGIN
		        new.secret = CASE WHEN new.secret IS NULL THEN NULL ELSE
			CASE WHEN new.key_id IS NULL THEN NULL ELSE pg_catalog.encode(
			  pgsodium.crypto_aead_det_encrypt(
				pg_catalog.convert_to(new.secret, 'utf8'),
				pg_catalog.convert_to((new.id::text || new.description::text || new.created_at::text || new.updated_at::text)::text, 'utf8'),
				new.key_id::uuid,
				new.nonce
			  ),
				'base64') END END;
		RETURN new;
		END;
		$$;


ALTER FUNCTION vault.secrets_encrypt_secret_secret() OWNER TO supabase_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: Action; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Action" (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    costs jsonb,
    "actionType" public."ActionType" NOT NULL,
    "actionSubtypes" text[],
    "characterInventoryId" integer,
    "cyberneticId" integer,
    "baseActionId" integer,
    "armorId" integer,
    duration jsonb,
    "itemId" integer,
    roll jsonb,
    "weaponId" integer
);


ALTER TABLE public."Action" OWNER TO postgres;

--
-- Name: Action_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Action_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Action_id_seq" OWNER TO postgres;

--
-- Name: Action_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Action_id_seq" OWNED BY public."Action".id;


--
-- Name: Armor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Armor" (
    id integer NOT NULL,
    name text NOT NULL,
    picture jsonb,
    description text,
    stats jsonb NOT NULL,
    price integer,
    keywords jsonb[],
    "characterInventoryId" integer,
    "cyberneticId" integer,
    equipped boolean DEFAULT false,
    "baseArmorId" integer,
    grade integer DEFAULT 1 NOT NULL,
    rarity public."ItemRarity" DEFAULT 'common'::public."ItemRarity" NOT NULL
);


ALTER TABLE public."Armor" OWNER TO postgres;

--
-- Name: Armor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Armor_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Armor_id_seq" OWNER TO postgres;

--
-- Name: Armor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Armor_id_seq" OWNED BY public."Armor".id;


--
-- Name: BookEntry; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BookEntry" (
    id integer NOT NULL,
    title text NOT NULL,
    page integer NOT NULL,
    "sectionId" integer NOT NULL,
    content jsonb NOT NULL
);


ALTER TABLE public."BookEntry" OWNER TO postgres;

--
-- Name: BookEntry_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."BookEntry_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BookEntry_id_seq" OWNER TO postgres;

--
-- Name: BookEntry_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."BookEntry_id_seq" OWNED BY public."BookEntry".id;


--
-- Name: BookSection; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BookSection" (
    id integer NOT NULL,
    "order" integer NOT NULL,
    title text NOT NULL
);


ALTER TABLE public."BookSection" OWNER TO postgres;

--
-- Name: BookSection_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."BookSection_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BookSection_id_seq" OWNER TO postgres;

--
-- Name: BookSection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."BookSection_id_seq" OWNED BY public."BookSection".id;


--
-- Name: Character; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Character" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    level integer DEFAULT 1 NOT NULL,
    profits integer DEFAULT 10 NOT NULL,
    stats jsonb DEFAULT '{}'::jsonb NOT NULL,
    picture jsonb,
    height integer NOT NULL,
    weight integer NOT NULL,
    age integer NOT NULL,
    sex text NOT NULL,
    background text NOT NULL,
    attributes jsonb NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text,
    active boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Character" OWNER TO postgres;

--
-- Name: CharacterCart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CharacterCart" (
    id integer NOT NULL,
    "characterId" integer
);


ALTER TABLE public."CharacterCart" OWNER TO postgres;

--
-- Name: CharacterCart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CharacterCart_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CharacterCart_id_seq" OWNER TO postgres;

--
-- Name: CharacterCart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CharacterCart_id_seq" OWNED BY public."CharacterCart".id;


--
-- Name: CharacterCondition; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CharacterCondition" (
    id integer NOT NULL,
    stacks integer,
    "conditionId" integer NOT NULL,
    "characterId" integer NOT NULL
);


ALTER TABLE public."CharacterCondition" OWNER TO postgres;

--
-- Name: CharacterCondition_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CharacterCondition_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CharacterCondition_id_seq" OWNER TO postgres;

--
-- Name: CharacterCondition_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CharacterCondition_id_seq" OWNED BY public."CharacterCondition".id;


--
-- Name: CharacterInventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CharacterInventory" (
    id integer NOT NULL,
    "characterId" integer
);


ALTER TABLE public."CharacterInventory" OWNER TO postgres;

--
-- Name: CharacterInventory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CharacterInventory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CharacterInventory_id_seq" OWNER TO postgres;

--
-- Name: CharacterInventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CharacterInventory_id_seq" OWNED BY public."CharacterInventory".id;


--
-- Name: Character_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Character_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Character_id_seq" OWNER TO postgres;

--
-- Name: Character_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Character_id_seq" OWNED BY public."Character".id;


--
-- Name: Condition; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Condition" (
    id integer NOT NULL,
    name text NOT NULL,
    "conditionType" public."ConditionType" NOT NULL,
    description text NOT NULL
);


ALTER TABLE public."Condition" OWNER TO postgres;

--
-- Name: Condition_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Condition_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Condition_id_seq" OWNER TO postgres;

--
-- Name: Condition_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Condition_id_seq" OWNED BY public."Condition".id;


--
-- Name: Cybernetic; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cybernetic" (
    id integer NOT NULL,
    name text NOT NULL,
    "cyberneticType" public."CyberneticType" NOT NULL,
    stats jsonb NOT NULL,
    picture jsonb,
    description text NOT NULL,
    body text[],
    price integer,
    keywords jsonb[],
    "characterInventoryId" integer,
    equipped boolean DEFAULT false,
    "baseCyberneticId" integer,
    grade integer DEFAULT 1 NOT NULL,
    rarity public."ItemRarity" DEFAULT 'common'::public."ItemRarity" NOT NULL
);


ALTER TABLE public."Cybernetic" OWNER TO postgres;

--
-- Name: Cybernetic_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Cybernetic_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Cybernetic_id_seq" OWNER TO postgres;

--
-- Name: Cybernetic_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Cybernetic_id_seq" OWNED BY public."Cybernetic".id;


--
-- Name: Error; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Error" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."Error" OWNER TO postgres;

--
-- Name: Error_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Error_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Error_id_seq" OWNER TO postgres;

--
-- Name: Error_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Error_id_seq" OWNED BY public."Error".id;


--
-- Name: Item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Item" (
    id integer NOT NULL,
    name text NOT NULL,
    rarity public."ItemRarity" DEFAULT 'common'::public."ItemRarity" NOT NULL,
    grade integer DEFAULT 1 NOT NULL,
    picture jsonb,
    price integer,
    equipped boolean DEFAULT false,
    category public."ItemCategory" NOT NULL,
    subcategory public."ItemSubcategory" NOT NULL,
    "itemType" text,
    description text NOT NULL,
    stats jsonb,
    "characterInventoryId" integer,
    "baseItemId" integer
);


ALTER TABLE public."Item" OWNER TO postgres;

--
-- Name: ItemCondition; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ItemCondition" (
    id integer NOT NULL,
    stacks integer,
    "conditionId" integer NOT NULL,
    "weaponId" integer,
    "armorId" integer,
    "cyberneticId" integer,
    "vehicleId" integer,
    "modificationId" integer,
    "itemId" integer
);


ALTER TABLE public."ItemCondition" OWNER TO postgres;

--
-- Name: ItemCondition_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ItemCondition_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ItemCondition_id_seq" OWNER TO postgres;

--
-- Name: ItemCondition_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ItemCondition_id_seq" OWNED BY public."ItemCondition".id;


--
-- Name: Item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Item_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Item_id_seq" OWNER TO postgres;

--
-- Name: Item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Item_id_seq" OWNED BY public."Item".id;


--
-- Name: Keyword; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Keyword" (
    id integer NOT NULL,
    "keywordType" public."KeywordType" NOT NULL,
    name text NOT NULL,
    description text NOT NULL
);


ALTER TABLE public."Keyword" OWNER TO postgres;

--
-- Name: Keyword_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Keyword_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Keyword_id_seq" OWNER TO postgres;

--
-- Name: Keyword_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Keyword_id_seq" OWNED BY public."Keyword".id;


--
-- Name: Modification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Modification" (
    id integer NOT NULL,
    name text NOT NULL,
    price integer,
    "modificationType" text NOT NULL,
    description text,
    "baseModificationId" integer,
    "characterInventoryId" integer,
    grade integer DEFAULT 1 NOT NULL,
    rarity public."ItemRarity" DEFAULT 'common'::public."ItemRarity" NOT NULL,
    "vehicleId" integer
);


ALTER TABLE public."Modification" OWNER TO postgres;

--
-- Name: Modification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Modification_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Modification_id_seq" OWNER TO postgres;

--
-- Name: Modification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Modification_id_seq" OWNED BY public."Modification".id;


--
-- Name: Modifier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Modifier" (
    id integer NOT NULL,
    type public."ModifierType" NOT NULL,
    stat text,
    operator text NOT NULL,
    "valueType" public."ValueType",
    attribute text,
    skill text,
    value integer,
    duration jsonb,
    "actionId" integer,
    "cyberneticId" integer,
    "itemId" integer,
    "perkId" integer
);


ALTER TABLE public."Modifier" OWNER TO postgres;

--
-- Name: Modifier_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Modifier_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Modifier_id_seq" OWNER TO postgres;

--
-- Name: Modifier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Modifier_id_seq" OWNED BY public."Modifier".id;


--
-- Name: PatchNote; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PatchNote" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    version double precision NOT NULL,
    title text NOT NULL,
    content jsonb NOT NULL
);


ALTER TABLE public."PatchNote" OWNER TO postgres;

--
-- Name: PatchNote_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PatchNote_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PatchNote_id_seq" OWNER TO postgres;

--
-- Name: PatchNote_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PatchNote_id_seq" OWNED BY public."PatchNote".id;


--
-- Name: Perk; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Perk" (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    requirements jsonb
);


ALTER TABLE public."Perk" OWNER TO postgres;

--
-- Name: Perk_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Perk_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Perk_id_seq" OWNER TO postgres;

--
-- Name: Perk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Perk_id_seq" OWNED BY public."Perk".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "profilePicture" text,
    "googleId" text,
    "facebookId" text,
    email text NOT NULL,
    password text,
    role public."UserRole" DEFAULT 'USER'::public."UserRole" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: Vehicle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Vehicle" (
    id integer NOT NULL,
    name text NOT NULL,
    picture jsonb,
    description text,
    stats jsonb NOT NULL,
    price integer,
    "characterInventoryId" integer,
    "baseVehicleId" integer,
    grade integer DEFAULT 1 NOT NULL,
    rarity public."ItemRarity" DEFAULT 'common'::public."ItemRarity" NOT NULL
);


ALTER TABLE public."Vehicle" OWNER TO postgres;

--
-- Name: Vehicle_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Vehicle_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Vehicle_id_seq" OWNER TO postgres;

--
-- Name: Vehicle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Vehicle_id_seq" OWNED BY public."Vehicle".id;


--
-- Name: Weapon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Weapon" (
    id integer NOT NULL,
    name text NOT NULL,
    picture jsonb,
    description text,
    stats jsonb NOT NULL,
    price integer,
    keywords jsonb[],
    "characterInventoryId" integer,
    "cyberneticId" integer,
    equipped boolean DEFAULT false,
    "baseWeaponId" integer,
    grade integer DEFAULT 1 NOT NULL,
    rarity public."ItemRarity" DEFAULT 'common'::public."ItemRarity" NOT NULL,
    "vehicleId" integer
);


ALTER TABLE public."Weapon" OWNER TO postgres;

--
-- Name: Weapon_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Weapon_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Weapon_id_seq" OWNER TO postgres;

--
-- Name: Weapon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Weapon_id_seq" OWNED BY public."Weapon".id;


--
-- Name: _ArmorToCharacterCart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_ArmorToCharacterCart" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_ArmorToCharacterCart" OWNER TO postgres;

--
-- Name: _CharacterCartToCybernetic; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_CharacterCartToCybernetic" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CharacterCartToCybernetic" OWNER TO postgres;

--
-- Name: _CharacterCartToItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_CharacterCartToItem" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CharacterCartToItem" OWNER TO postgres;

--
-- Name: _CharacterCartToModification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_CharacterCartToModification" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CharacterCartToModification" OWNER TO postgres;

--
-- Name: _CharacterCartToVehicle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_CharacterCartToVehicle" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CharacterCartToVehicle" OWNER TO postgres;

--
-- Name: _CharacterCartToWeapon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_CharacterCartToWeapon" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CharacterCartToWeapon" OWNER TO postgres;

--
-- Name: _CharacterToPerk; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_CharacterToPerk" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CharacterToPerk" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- Name: decrypted_secrets; Type: VIEW; Schema: vault; Owner: supabase_admin
--

CREATE VIEW vault.decrypted_secrets AS
 SELECT secrets.id,
    secrets.name,
    secrets.description,
    secrets.secret,
        CASE
            WHEN (secrets.secret IS NULL) THEN NULL::text
            ELSE
            CASE
                WHEN (secrets.key_id IS NULL) THEN NULL::text
                ELSE convert_from(pgsodium.crypto_aead_det_decrypt(decode(secrets.secret, 'base64'::text), convert_to(((((secrets.id)::text || secrets.description) || (secrets.created_at)::text) || (secrets.updated_at)::text), 'utf8'::name), secrets.key_id, secrets.nonce), 'utf8'::name)
            END
        END AS decrypted_secret,
    secrets.key_id,
    secrets.nonce,
    secrets.created_at,
    secrets.updated_at
   FROM vault.secrets;


ALTER VIEW vault.decrypted_secrets OWNER TO supabase_admin;

--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Name: Action id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Action" ALTER COLUMN id SET DEFAULT nextval('public."Action_id_seq"'::regclass);


--
-- Name: Armor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Armor" ALTER COLUMN id SET DEFAULT nextval('public."Armor_id_seq"'::regclass);


--
-- Name: BookEntry id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BookEntry" ALTER COLUMN id SET DEFAULT nextval('public."BookEntry_id_seq"'::regclass);


--
-- Name: BookSection id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BookSection" ALTER COLUMN id SET DEFAULT nextval('public."BookSection_id_seq"'::regclass);


--
-- Name: Character id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Character" ALTER COLUMN id SET DEFAULT nextval('public."Character_id_seq"'::regclass);


--
-- Name: CharacterCart id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CharacterCart" ALTER COLUMN id SET DEFAULT nextval('public."CharacterCart_id_seq"'::regclass);


--
-- Name: CharacterCondition id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CharacterCondition" ALTER COLUMN id SET DEFAULT nextval('public."CharacterCondition_id_seq"'::regclass);


--
-- Name: CharacterInventory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CharacterInventory" ALTER COLUMN id SET DEFAULT nextval('public."CharacterInventory_id_seq"'::regclass);


--
-- Name: Condition id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Condition" ALTER COLUMN id SET DEFAULT nextval('public."Condition_id_seq"'::regclass);


--
-- Name: Cybernetic id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cybernetic" ALTER COLUMN id SET DEFAULT nextval('public."Cybernetic_id_seq"'::regclass);


--
-- Name: Error id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Error" ALTER COLUMN id SET DEFAULT nextval('public."Error_id_seq"'::regclass);


--
-- Name: Item id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Item" ALTER COLUMN id SET DEFAULT nextval('public."Item_id_seq"'::regclass);


--
-- Name: ItemCondition id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ItemCondition" ALTER COLUMN id SET DEFAULT nextval('public."ItemCondition_id_seq"'::regclass);


--
-- Name: Keyword id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Keyword" ALTER COLUMN id SET DEFAULT nextval('public."Keyword_id_seq"'::regclass);


--
-- Name: Modification id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Modification" ALTER COLUMN id SET DEFAULT nextval('public."Modification_id_seq"'::regclass);


--
-- Name: Modifier id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Modifier" ALTER COLUMN id SET DEFAULT nextval('public."Modifier_id_seq"'::regclass);


--
-- Name: PatchNote id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PatchNote" ALTER COLUMN id SET DEFAULT nextval('public."PatchNote_id_seq"'::regclass);


--
-- Name: Perk id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Perk" ALTER COLUMN id SET DEFAULT nextval('public."Perk_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: Vehicle id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vehicle" ALTER COLUMN id SET DEFAULT nextval('public."Vehicle_id_seq"'::regclass);


--
-- Name: Weapon id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Weapon" ALTER COLUMN id SET DEFAULT nextval('public."Weapon_id_seq"'::regclass);


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) FROM stdin;
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
\.


--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--

COPY pgsodium.key (id, status, created, expires, key_type, key_id, key_context, name, associated_data, raw_key, raw_key_nonce, parent_key, comment, user_data) FROM stdin;
\.


--
-- Data for Name: Action; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Action" (id, name, description, costs, "actionType", "actionSubtypes", "characterInventoryId", "cyberneticId", "baseActionId", "armorId", duration, "itemId", roll, "weaponId") FROM stdin;
124	Upload: Friendly Fire	Cause a turret or drone to immediately attack a target of your choice. Upkeep.	[{"stat": "actionPoints", "value": 1}, {"stat": "wyrmShells", "value": 1}]	action	{unique,upkeep}	\N	104	\N	\N	\N	\N	\N	\N
125	Upload: Wyrmkiller	Remove a wyrm or malfunction currently affecting a target. The TN is the successes of the previous Upload.	[{"stat": "actionPoints", "value": 1}, {"stat": "wyrmShells", "value": 1}]	action	{unique}	\N	105	\N	\N	\N	\N	\N	\N
58	Mind fortress	Gain +1 Ward until the end of your next turn.	[{"stat": "reactionPoints", "value": 1}, {"stat": "power", "value": 1}]	reaction	{unique}	\N	40	\N	\N	null	\N	null	\N
50	Heavy Malware	Deploy the Cyber Deck. Whilst deployed, you can only take simple actions, such as walking and conversating. Your Upload range increases to 500 feet.	[]	extendedAction	{unique}	\N	21	\N	\N	\N	\N	\N	\N
53	Doc-Oc	Once per round, you may parry without using a reaction. When parrying, you may roll Chromebits instead of Assault.	[]	reaction	{unique}	\N	22	\N	\N	null	\N	null	\N
42	Let It Burn	As a reaction, you become immune to Burning. Remove all stacks; you cannot receive any until the end of your next turn.	[{"stat": "reactionPoints", "value": 1}]	reaction	{unique}	\N	7	\N	\N	\N	\N	\N	\N
54	Critical!	Declare a target within line of sight. Roll Chromebits against their Networked rating. If you succeed, they become Vulnerable X to the next attack declared against them, where X is 1 + each additional success beyond the TN. 	[{"stat": "actionPoints", "value": 1}]	action	{unique}	\N	27	\N	\N	null	\N	null	\N
34	Split Second	Activate only once per day. You take an extra turn after this one ends. During that turn, other characters can’t use reactions unless they have a Sandorino or something similar.	[{"stat": "power", "value": 1}, {"stat": "health", "value": 5}]	action	{unique}	\N	14	\N	\N	\N	\N	\N	\N
35	Ride the Lightning	Activate only once per turn. Gain an extra action this turn. You can make an additional attack and ignore the two movement salvo/flurry rule.	[{"stat": "power", "value": 2}, {"stat": "health", "value": 3}]	action	{unique}	\N	14	\N	\N	\N	\N	\N	\N
41	Buster	You can pay for this ability up to 3 times at once to charge up the weapon, modifying it's stats per charge. Use the first, second, or third weapon profile respective to the number of actions used to charge up the weapon.	[{"stat": "actionPoints", "value": 1}, {"stat": "power", "value": 1}]	action	{unique}	\N	12	\N	\N	\N	\N	\N	\N
29	Imbue Shocking	Give your unarmed attacks Shocking 1. They retain the condition until they successfully break evasion.	[{"stat": "power", "value": 1}]	action	{unique}	\N	11	\N	\N	\N	\N	\N	\N
56	Static Arc	Roll against the evasion of all characters within 10 feet of you. If successful, grant them a stack of Shocked. This does not count as an attack.	[{"stat": "actionPoints", "value": 1}, {"stat": "power", "value": 1}]	action	{unique}	\N	38	\N	\N	null	\N	null	\N
48	Viper Sting	Make a melee strike against a target in reach (you may roll Chromebits). Instead of dealing damage, the target is Poisoned 3. A character can only be affected by this poison once per scene. This does not count as your attack this turn.	[]	action	{unique}	\N	15	\N	\N	\N	\N	\N	\N
57	Infinite grounding	You become immune to Shocked. Remove all stacks; you cannot receive any until the end of your next turn.	[{"stat": "reactionPoints", "value": 1}, {"stat": "power", "value": 1}]	reaction	{unique}	\N	39	\N	\N	null	\N	null	\N
40	Insertion	Using the Gestalt connection (by rolling Gestalt against the target’s Gestalt Rating), you can insert simple thoughts or ideas to other individuals. Some perks or conditions may alter or augment this ability. This ability requires contact unless it was preceded by a Mind Expansion action. In Combat, this ability uses the Psychic Salvo weapon profile. \n	[{"stat": "actionPoints", "value": 1}]	action	{attack}	\N	\N	\N	\N	\N	\N	\N	\N
59	One with the Serpent	You become immune to Poison. Remove all stacks; you cannot receive any until the end of your next turn.	[{"stat": "reactionPoints", "value": 1}, {"stat": "power", "value": 1}]	reaction	{unique}	\N	41	\N	\N	\N	\N	\N	\N
45	Rewire	Contest the target’s Hardwire Rating. On a success, you can activate or deactivate one of the target’s functions. Doors can be opened or closed, turrets can be turned on or off, etc.	[{"stat": "actionPoints", "value": 1}]	action	{}	\N	\N	\N	\N	\N	\N	\N	\N
46	Command	Issue a drone, turret, or other linked device a command. Commands can be continuous. A character can have a number of active drones equal to their Hardwired Rating. A drone can be issued a command (or transmit information to its user) so long as it is within 100ft, 250ft, 500ft, or 1000ft the user respective to their Hardwired rating. Drones will continue to follow their last command, and can generally adapt to broad orders. As long as a drone remains in range of its owner, it can continue to freely operate according to its command. In combat, a command can be used to have a drone perform one of its available actions immediately.\n	[{"stat": "actionPoints", "value": 1}]	action	{}	\N	\N	\N	\N	\N	\N	\N	\N
47	Drive	Move your vehicle a number of tiles equal to its agility rating.	[{"stat": "actionPoints", "value": 1}]	action	{}	\N	\N	\N	\N	\N	\N	\N	\N
39	Razor’s Edge	As a reaction, gain +1 Evasion until the end of your next turn.	[{"stat": "reactionPoints", "value": 1}, {"stat": "power", "value": 1}]	reaction	{unique}	\N	8	\N	\N	\N	\N	\N	\N
129	Upload: Overload	Cause a target to lose health equal to their greatest Cyber amongst equipped cybernetics. Upkeep.	[{"stat": "actionPoints", "value": 1}, {"stat": "wyrmShells", "value": 1}]	action	{unique,upkeep}	\N	109	\N	\N	\N	\N	\N	\N
81	Shock Drop	When landing from a fall, a thermal Blast emits from your retro thrusters. All adjacent targets struck receive the Burning Condition.	[{"stat": "reactionPoints", "value": 1}, {"stat": "power", "value": 1}]	reaction	{unique}	\N	80	\N	\N	\N	\N	\N	\N
62	Enhanced Haymaker	Your next haymaker can push its target an additional 5 feet. If they impact a character or object, both take an additional instance of 2 damage.	[{"stat": "power", "value": 1}]	action	{unique}	\N	67	\N	\N	\N	\N	\N	\N
87	Charge	Move a distance up to your speed in a straight line. When you finish your movement, you may make a single Strike or Haymaker.	[{"stat": "actionPoints", "value": 1}]	action	{attack,movement}	\N	\N	\N	\N	{"unit": "", "value": null}	\N	[]	\N
89	Flurry	Roll as though you’re making a strike, but receive +2 Dice. Every success beyond their evasion grants you another instance of damage (up to your Flurry rating). Armor applies to each instance. Afterwards, attacks against you are Booming until your next turn. You cannot Flurry after completing two movements in one turn, nor can you move after making a Flurry Attack.	[{"stat": "actionPoints", "value": 1}]	action	{attack}	\N	\N	\N	\N	{"unit": "", "value": null}	\N	[]	\N
66	Counter-hack	when a character succeeds on a Networked check against you, react with a counter-hack, causing them to lose 4 Health.	[{"stat": "reactionPoints", "value": 1}, {"stat": "power", "value": 1}]	reaction	{unique}	\N	72	\N	\N	\N	\N	\N	\N
65	Maximum Armor	Shield yourself until the end of your next turn, activating the electromesh beneath your skin. Use the bonus stats from the armor profile above in addition to any other armor you have equipped while the effect is active.	[{"stat": "reactionPoints", "value": 1}, {"stat": "power", "value": 1}]	reaction	{unique}	\N	71	\N	\N	\N	\N	\N	\N
64	Emit Gutteral	Launch a sonic shockwave as an attack, using the above weapon profile. Each target (regardless of the roll) is deafened until the end of your next turn (not this one) and receives the rattled condition.	[{"stat": "actionPoints", "value": 1}, {"stat": "power", "value": 1}]	action	{unique,attack}	\N	69	\N	\N	\N	\N	\N	\N
127	Upload: Viral Psychosis	The target gains the Berserk condition until the end of your next turn. Their attacks are Booming. When they are taken down, you may use your reaction to Upload the wyrm to a new target within range. This Reupload does not require a Wyrm Shell (but still requires a roll). Upkeep.	[{"stat": "actionPoints", "value": 1}, {"stat": "wyrmShells", "value": 2}]	action	{unique,upkeep}	\N	107	\N	\N	\N	\N	\N	\N
126	Upload: Slow Cooker	At the start of a target’s turn, they lose X Health and Sanity, where X is the number of times this has happened. Upkeep.	[{"stat": "actionPoints", "value": 1}, {"stat": "wyrmShells", "value": 1}]	action	{unique,upkeep}	\N	106	\N	\N	\N	\N	\N	\N
88	Grab	Both characters can roll Assault or Threshold. Contest the rolls. If the Grabber wins, the target is grabbed.	[{"stat": "actionPoints", "value": 1}]	action	{}	\N	\N	\N	\N	\N	\N	\N	\N
90	Haymaker	Make a single Strike against a single target. This strike adds your Assault Rating to its damage. Until your next turn, attacks against you are Booming. You cannot Haymaker completing two movements in one turn, nor can you move after making a Haymaker.	[{"stat": "actionPoints", "value": 1}]	action	{attack}	\N	\N	\N	\N	\N	\N	\N	\N
128	Upload: Psybreak	Cause the target to emit a psychic lash, dealing X sanity damage to all other characters within 30 feet of them, where X is the highest rating amongst Gestalt, Godhead, or Outerworld. The target loses X sanity.	[{"stat": "actionPoints", "value": 1}, {"stat": "wyrmShells", "value": 2}]	action	{unique}	\N	108	\N	\N	\N	\N	\N	\N
74	Coral Interweave	While Coral Convergence is active, you can use your detection range as the range for any Esoterica Skill or Action. This roll receives Dooming if it is beyond the normal range of an ability.	[]	extendedAction	{unique}	\N	73	\N	\N	\N	\N	\N	\N
84	Omnipresent Mind	Loosely expand your consciousness, detecting all living beings with (125 x Gestalt) feet. You can narrow down what creatures by categorizing what you’re detecting. While doing this, attacks against you are Booming.	[{"stat": "actionPoints", "value": 1}, {"stat": "sanity", "value": 1}]	action	{unique}	\N	78	\N	\N	\N	\N	\N	\N
79	Double Jump	Once per jump while in midair, activate the R-INT Rebounders to make another jump.	[{"stat": "power", "value": 1}]	action	{unique,movement}	\N	79	\N	\N	\N	\N	\N	\N
80	Wall Jump	Once per jump, you may perform another jump off of an adjacent vertical surface.	[]	action	{unique,movement}	\N	79	\N	\N	\N	\N	\N	\N
91	Parry	Contest an incoming melee attack with Violence (Assault). You reduce their successes for each one of yours.	[{"stat": "reactionPoints", "value": 1}]	reaction	{}	\N	\N	\N	\N	\N	\N	\N	\N
92	Single Strike	Declare a target within melee range, and which equipped melee weapon you’re using. Roll Violence (Assault) attempting to equal or exceed their Evasion stat. If you succeed, you hit and deal damage based on the weapon.	[{"stat": "actionPoints", "value": 1}]	action	{attack}	\N	\N	\N	\N	\N	\N	\N	\N
94	Single Shot	Declare a target within weapon range, and which equipped ranged weapon you’re using. Roll Violence (Shooting) attempting to equal or exceed their evasion stat. If you succeed, you hit and deal damage based on the weapon.	[{"stat": "actionPoints", "value": 1}]	action	{attack}	\N	\N	\N	\N	\N	\N	\N	\N
95	First Aid	Using medical supplies, perform basic medical attention. Can be used to: regain Health, remove a condition received from an injury, apply stimulants to a character, or revive an unconscious character.	[{"stat": "actionPoints", "value": 1}]	action	{}	\N	\N	\N	\N	\N	\N	\N	\N
96	Identify	Roll Erudition against the target’s subterfuge. If successful, you can learn the target’s statistics.	[{"stat": "actionPoints", "value": 1}]	action	{}	\N	\N	\N	\N	\N	\N	\N	\N
102	Upload	Breach a character’s cyberlink with a successful Networked check, then create a wyrm or malfunction in their system.	[{"stat": "actionPoints", "value": 1}, {"stat": "wyrmShells", "value": 1}]	action	{}	\N	\N	\N	\N	\N	\N	\N	\N
99	Mind Expansion	Expand your senses to detect people within your range (listed in the Gestalt section). Until your next turn, attacks against you are Booming.	[{"stat": "actionPoints", "value": 1}]	action	{}	\N	\N	\N	\N	\N	\N	\N	\N
100	Possession	Allow a random phantom nearby to possess you, granting one of a list of effects at random.	[]	action	{}	\N	\N	\N	\N	\N	\N	\N	\N
103	Bind	Perform a ranged or melee attack using Mysticism. A ranged attack must expend an Ofuda. If successful, the target’s next Esoteric roll has Dooming, unless it’s Mysticism.	[{"stat": "actionPoints", "value": 1}]	action	{attack}	\N	\N	\N	\N	\N	\N	\N	\N
104	Distract	Declare a target who can hear and understand you. Roll Rhetoric against theirs. If you succeed, the enemy’s next roll has Dooming unless it targets you.	[{"stat": "actionPoints", "value": 1}]	action	{}	\N	\N	\N	\N	\N	\N	\N	\N
105	Exposure	Reveal, through poetic incantation (by rolling godhead against their godhead), a dread universal truth. A character who can hear you and see you receives a random negative status effect, listed in the Godhead section.	[{"stat": "actionPoints", "value": 1}]	action	{attack}	\N	\N	\N	\N	\N	\N	\N	\N
106	Waking Dream	Affect luck based events in real time, by spinning your dreamview into reality. More details listed in the Godhead section. (Can be considered an attack.)	[{"stat": "actionPoints", "value": 1}]	action	{}	\N	\N	\N	\N	\N	\N	\N	\N
49	ODM	As a movement action, you may fire twin cables into terrain up to 25 feet away. You can then hang, swing, or retract the cables to pull yourself the full distance. If you do not retract immediately, it later requires a movement action. 	[{"stat": "actionPoints", "value": 1}]	action	{unique}	\N	20	\N	\N	null	\N	null	\N
28	Imbue High Impact	Give your unarmed attacks High Impact. They retain the condition until they successfully break evasion.	[{"stat": "power", "value": 1}]	action	{unique}	\N	11	\N	\N	\N	\N	\N	\N
61	Enhanced first aid	Performing enhanced first aid removes an additional viable condition (for a total of 2) from the target and allows them to use their reaction to stand, take cover, or reload.	[{"stat": "actionPoints", "value": 1}, {"stat": "power", "value": 1}]	action	{unique}	\N	65	\N	\N	\N	\N	\N	\N
93	Salvo	Roll a shooting attack; add +2 to your dice pool. Each success beyond their evasion, up to your Salvo Rating, counts as an additional instance of damage. Until your next turn, attacks against you are Booming. You cannot salvo after completing two movements in one turn, nor can you move after making a Salvo attack.	[{"stat": "actionPoints", "value": 1}]	action	{attack}	\N	\N	\N	\N	{"unit": "", "value": null}	\N	[]	\N
60	Radar pulse	Emit a Sonic Scan, creating a 3-D map of an area (50x50 feet max) and its inhabitants at the moment of the scan.	[{"stat": "power", "value": 1}]	action	{unique}	\N	62	\N	\N	\N	\N	\N	\N
51	Marked for Ego Death	Mark a character or characters you see in range. Marked characters can be targeted by Upload as long as they’re within 500 feet; line of sight not required. While deployed, you retain the mark and track their location, even if they exceed 500 feet. You lose the mark once you deactivate it.	[{"stat": "actionPoints", "value": 1}]	action	{unique}	\N	21	\N	\N	\N	\N	\N	\N
85	Psyknowing	Focus on one target, rolling Gestalt against their Gestalt rating. If successful, you can discern hidden emotional information. You can discern intent, particularly malintent, and can even skim surface thoughts for a few words or pictures. The range of this ability is (5 x Gestalt) Feet.	[{"stat": "sanity", "value": 1}]	action	{unique}	\N	78	\N	\N	\N	\N	\N	\N
55	Counter Critical!	Declare a target within line of sight. Roll Chromebits against their Networked rating. If you succeed, they become Vulnerable X to the next attack declared against them, where X is 1 + each additional success beyond the TN. 	[{"stat": "reactionPoints", "value": 1}]	reaction	{unique}	\N	27	\N	\N	null	\N	null	\N
132	Domination	Any character utilizing cybernetic vision or similar technology has dooming on their rolls targeting you. Network checks receive Dooming regardless of vision used. 	[{"stat": "reactionPoints", "value": 1}, {"stat": "power", "value": 1}]	reaction	{unique}	\N	74	\N	\N	\N	\N	\N	\N
123	Upload: Frazzle	The target’s rolls that target another character have Dooming. Upkeep.	[{"stat": "actionPoints", "value": 1}, {"stat": "wyrmShells", "value": 1}]	action	{unique,upkeep}	\N	103	\N	\N	\N	\N	\N	\N
73	Coral Convergence	As an extended action, you can deploy the Coral Array. You cannot move while deployed. Many long but thin mechanical tendrils sprout from it. Their tips end in sensors that cycle through various hues. While deployed, you can detect any paranormal creature within 1000 feet. You can also detect any human character that has points in any Esoterica skills. You can estimate their location in 3-D space, but it isn’t perfect. Finally, you can Deploy in conjunction with a Full Dive Pod, in which case you can use Esoterica Actions against those you encounter.	[]	extendedAction	{unique}	\N	73	\N	\N	\N	\N	\N	\N
63	Enhanced Charge	Your next explosive Charge Attack ignores Slowed and other penalties that interfere with movement.	[{"stat": "power", "value": 1}]	action	{unique}	\N	67	\N	\N	\N	\N	\N	\N
86	Screech	As an Attack, roll Gestalt against all characters within 30 feet of you, dealing Sanity damage equal to your Gestalt Rating to all that are struck. Enemies struck by Screech receive the rattled condition	[{"stat": "actionPoints", "value": 1}, {"stat": "sanity", "value": 1}]	action	{unique,attack}	\N	78	\N	\N	\N	\N	\N	\N
83	Forced Insertion	Using the Gestalt connection (by rolling Gestalt against the target’s Gestalt Rating), you can insert simple thoughts or ideas to other individuals. Some perks or conditions may alter or augment this ability. This ability requires contact unless it was preceded by a Mind Expansion action, in which case it uses your Mind Expansion as its Range. In Combat, this ability uses the Psychic Barrage weapon profile found above.	[{"stat": "actionPoints", "value": 1}, {"stat": "sanity", "value": 1}]	action	{unique,attack}	\N	78	\N	\N	\N	\N	\N	\N
82	Jackal Maneuver	Anytime you are going to jump, you may activate Jackal Maneuver to enhance your jump. Your speed is treated as though it were +1 bracket higher, and your descent is slowed, allowing you to glide 5 feet forward for every 10 feet you fall.	[{"stat": "actionPoints", "value": 1}, {"stat": "power", "value": 1}]	action	{unique}	\N	80	\N	\N	\N	\N	\N	\N
138	Night Vision	Grants the user immunity to the downsides of darkness.	[{"stat": "power", "value": 1}]	action	{unique}	\N	\N	\N	\N	{"unit": "hour", "value": 1}	1	[]	\N
141	Deploy	Deploy the D-Delta 34 DC, providing one tile of cover at the location of deployment.	[{"stat": "actionPoints", "value": 1}]	action	{unique}	\N	\N	\N	\N	\N	8	[]	\N
142	Grapple	Shoot the grappling hook up to a maximum of 50 feet, allowing your next movement to traverse a large gap or move vertically up a wall.	[{"stat": "actionPoints", "value": 1}, {"stat": "power", "value": 1}]	action	{unique}	\N	\N	\N	\N	\N	9	[{"skill": "hardwired", "attribute": "cybernetica"}, {"skill": "shooting", "attribute": "violence"}]	\N
145	Mecha Wings	Activate while midair to jump an additional time.	[{"stat": "power", "value": 1}]	action	{unique}	\N	\N	\N	21	\N	\N	[]	\N
146	Mecha Parkour	Activate while taking a movement action. That movement action can be taken up or across a vertical surface.	[{"stat": "power", "value": 1}]	action	{unique}	\N	\N	\N	21	\N	\N	[]	\N
143	Living in the 80s	Make a movement action with +4 speed. Until the start of your next turn, your melee attacks are Booming and you have +1 Evasion. 	[{"stat": "actionPoints", "value": 1}, {"stat": "power", "value": 1}]	action	{movement}	\N	76	\N	\N	{"unit": "turn", "value": 1}	\N	[]	\N
144	Languish	Activate only once per day. When you become Possessed, you may declare a target in line of sight, or one whose identity is known to you. You can direct the hatred of the bones to that target, causing them to become Vulnerable 2 to your attacks.	[{"stat": "actionPoints", "value": 1}]	action	{unique}	\N	\N	\N	\N	\N	21	[]	\N
149	Mecha Wings	Activate while midair to jump an additional time.	[{"stat": "power", "value": 1}]	action	{unique}	6	\N	145	28	null	\N	[]	\N
150	Mecha Parkour	Activate while taking a movement action. That movement action can be taken up or across a vertical surface.	[{"stat": "power", "value": 1}]	action	{unique}	6	\N	146	28	null	\N	[]	\N
153	Night Vision	Grants the user immunity to the downsides of darkness.	[{"stat": "power", "value": 1}]	action	{unique}	6	\N	138	\N	{"unit": "hour", "value": 1}	23	[]	\N
178	Doc-Oc	Once per round, you may parry without using a reaction. When parrying, you may roll Chromebits instead of Assault.	[]	reaction	{unique}	6	88	53	\N	null	\N	null	\N
179	Buster	You can pay for this ability up to 3 times at once to charge up the weapon, modifying it's stats per charge. Use the first, second, or third weapon profile respective to the number of actions used to charge up the weapon.	[{"stat": "actionPoints", "value": 1}, {"stat": "power", "value": 1}]	action	{unique}	6	95	41	\N	null	\N	null	\N
180	ODM	As a movement action, you may fire twin cables into terrain up to 25 feet away. You can then hang, swing, or retract the cables to pull yourself the full distance. If you do not retract immediately, it later requires a movement action. 	[{"stat": "actionPoints", "value": 1}]	action	{unique}	6	93	49	\N	null	\N	null	\N
181	Upload: Wyrmkiller	Remove a wyrm or malfunction currently affecting a target. The TN is the successes of the previous Upload.	[{"stat": "actionPoints", "value": 1}, {"stat": "wyrmShells", "value": 1}]	action	{unique}	13	116	125	\N	null	\N	null	\N
184	Upload: Overload	Cause a target to lose health equal to their greatest Cyber amongst equipped cybernetics. Upkeep.	[{"stat": "actionPoints", "value": 1}, {"stat": "wyrmShells", "value": 1}]	action	{unique,upkeep}	6	124	129	\N	null	\N	null	\N
185	Upload: Viral Psychosis	The target gains the Berserk condition until the end of your next turn. Their attacks are Booming. When they are taken down, you may use your reaction to Upload the wyrm to a new target within range. This Reupload does not require a Wyrm Shell (but still requires a roll). Upkeep.	[{"stat": "actionPoints", "value": 1}, {"stat": "wyrmShells", "value": 2}]	action	{unique,upkeep}	13	117	127	\N	null	\N	null	\N
186	Upload: Slow Cooker	At the start of a target’s turn, they lose X Health and Sanity, where X is the number of times this has happened. Upkeep.	[{"stat": "actionPoints", "value": 1}, {"stat": "wyrmShells", "value": 1}]	action	{unique,upkeep}	13	115	126	\N	null	\N	null	\N
187	Split Second	Activate only once per day. You take an extra turn after this one ends. During that turn, other characters can’t use reactions unless they have a Sandorino or something similar.	[{"stat": "power", "value": 1}, {"stat": "health", "value": 5}]	action	{unique}	9	119	34	\N	null	\N	null	\N
188	Ride the Lightning	Activate only once per turn. Gain an extra action this turn. You can make an additional attack and ignore the two movement salvo/flurry rule.	[{"stat": "power", "value": 2}, {"stat": "health", "value": 3}]	action	{unique}	9	119	35	\N	null	\N	null	\N
189	Upload: Wyrmkiller	Remove a wyrm or malfunction currently affecting a target. The TN is the successes of the previous Upload.	[{"stat": "actionPoints", "value": 1}, {"stat": "wyrmShells", "value": 1}]	action	{unique}	6	125	125	\N	null	\N	null	\N
190	Endure	Though governed by Threshold, Endure is not necessarily an action, nor is it a reaction. Other skills, attacks, and abilities may call for an individual to Endure. Characters enduring roll their threshold against a TN set by: another character’s roll (contest), a character’s skill rating (abilities), or an item’s rating (equipment). There are other causes and many varied effects that tie in Endurance rolls, but each is usually detailed in its own rules. Endurance is also the basis for holding breath. As a standard, a character can hold their breath for (30 x Threshold) seconds, but could roll for more.	[]	action	{}	\N	\N	\N	\N	{"unit": "", "value": null}	\N	[{"skill": "threshold", "attribute": "violence"}]	\N
191	Detect	Through knowledge of fakes, covers, and camouflage attempt to discern hidden individuals or objects. Detect rolls subterfuge against a TN set by a variety of factors. It could be another individual’s subterfuge rating, if they’re unaware they’re being tracked. It could be contested as stated above in the sneak section, or it could be against a TN created by another character’s subterfuge roll, as is the case with concealed goods.	[{"stat": "actionPoints", "value": 1}]	action	{}	\N	\N	\N	\N	{"unit": "", "value": null}	\N	[{"skill": "subterfuge", "attribute": "violence"}]	\N
182	Heavy Malware	Deploy the Cyber Deck. Whilst deployed, you can only take simple actions, such as walking and conversating. Your Upload range increases to 500 feet.	[]	extendedAction	{unique}	6	102	50	\N	null	\N	null	\N
183	Marked for Ego Death	Mark a character or characters you see in range. Marked characters can be targeted by Upload as long as they’re within 500 feet; line of sight not required. While deployed, you retain the mark and track their location, even if they exceed 500 feet. You lose the mark once you deactivate it.	[{"stat": "actionPoints", "value": 1}]	action	{unique}	6	102	51	\N	null	\N	null	\N
192	Sneak Attack	Make an attack (strike, shot, salvo, or flurry) against an unaware target, rolling subterfuge. Sneak attacks always roll Subterfuge. That roll receives Booming. Attacks made with a Concealed weapon are Sneak Attacks, even if the target is aware of the attacker (but only if all the weapons involved were concealed). The weapons are not concealed afterward. If you exceed the target’s Evasion by 2 or more, your attack gains Anti-Armor if it is melee (this bonus is gained after all possible attacks hit in a flurry). Sneak Attacks can’t be reacted to.	[{"stat": "actionPoints", "value": 1}]	action	{attack}	\N	\N	\N	\N	{"unit": "", "value": null}	\N	[{"skill": "subterfuge", "attribute": "violence"}]	\N
193	Sneak	Move up to half your speed per action whilst attempting to go unnoticed. Sneak Rolls can be compared against a TN from a digital or paranormal system, or against a TN set by an NPC’s subterfuge rating. If a character is actively looking for another that’s hiding, then both characters can contest subterfuge. These rules also apply to unmoving sneaks, which are often referred to by the word Hide.	[{"stat": "actionPoints", "value": 1}]	action	{movement}	\N	\N	\N	\N	{"unit": "", "value": null}	\N	[]	\N
194	Initiative	Roll any violence skill to determine the turn order of combat participants.	[]	action	{}	\N	\N	\N	\N	{"unit": "", "value": null}	\N	[{"skill": "", "attribute": "violence"}]	\N
\.


--
-- Data for Name: Armor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Armor" (id, name, picture, description, stats, price, keywords, "characterInventoryId", "cyberneticId", equipped, "baseArmorId", grade, rarity) FROM stdin;
2	Mk. 3 Industrial Suit	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735946963/gated/svhkzcrpeypdxwb7dgs9.jpg", "publicId": "gated/svhkzcrpeypdxwb7dgs9"}	Designed to protect laborers against hazardous environments.	{"armor": 4, "block": 10, "power": 6, "weight": 10}	15	{"{\\"keywordId\\": 17}","{\\"keywordId\\": 19}"}	\N	\N	f	\N	1	common
27	Reactive Cloak	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738979296/gated/jl8bcstmvld7vlzxdk9q.jpg", "publicId": "gated/jl8bcstmvld7vlzxdk9q"}	A full body cloak covered in reactive electrocells that alter its color scheme. A cheap alternative to the advanced scout suit.	{"armor": 1, "block": 4, "weight": 2, "currentBlock": 4}	3	{"{\\"keywordId\\": 13}","{\\"keywordId\\": 54}","{\\"keywordId\\": 55}"}	1	\N	t	18	1	uncommon
14	Tac-Armor	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738979660/gated/h86ovdn1yr4xbxbj6rko.jpg", "publicId": "gated/h86ovdn1yr4xbxbj6rko"}	AGU issued tactical body armor. Good stuff by street standards.	{"armor": 4, "block": 6, "weight": 6}	3	{"{\\"keywordId\\": 13}"}	\N	\N	f	\N	1	common
10	Body Vest	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735961239/gated/i0il2fv8vy4tc4qsc9su.jpg", "publicId": "gated/i0il2fv8vy4tc4qsc9su"}	Simple and common, used even by civilians in high risk zones.	{"armor": 3, "block": 4, "weight": 4, "currentBlock": 4}	2	{"{\\"keywordId\\": 13}"}	\N	\N	f	\N	1	common
21	Ko Shin Hakuo	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736499997/gated/aj59liaqm2yfdd6phtuy.jpg", "publicId": "gated/aj59liaqm2yfdd6phtuy"}	An advanced federal power armor reserved for elite agents – or sold to fund their desperate bid for revival. Its onboard jet thrusters make it the king of armored mobility.	{"armor": 5, "block": 12, "power": 12, "weight": 6, "currentBlock": 12, "currentPower": 12}	60	{"{\\"keywordId\\": 16}","{\\"keywordId\\": 56}","{\\"keywordId\\": 17}"}	\N	\N	f	\N	1	blackMarket
17	Lamellar Lining	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736500524/gated/n7hjclbicquln7isxlpx.jpg", "publicId": "gated/n7hjclbicquln7isxlpx"}	A lightweight efficient lining that can be worn in clothes or added on top of armor.	{"armor": 1, "block": 10, "weight": 2}	2	{"{\\"keywordId\\": 13}"}	\N	\N	f	\N	1	uncommon
20	Exoskeleton	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738978523/gated/j6srktoqldv4rtxprvud.jpg", "publicId": "gated/j6srktoqldv4rtxprvud"}	The precursor to many cybernetics and power armors of today.	{"armor": 2, "block": 6, "power": 6, "weight": 4}	10	{"{\\"keywordId\\": 19}","{\\"keywordId\\": 17}","{\\"keywordId\\": 57}"}	\N	\N	f	\N	1	common
26	FDR Scout Suit	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738978593/gated/ynzacgd1ym8lhao87upc.jpg", "publicId": "gated/ynzacgd1ym8lhao87upc"}	Federal design utilizing adaptive smart camo to conceal the wearer.	{"armor": 3, "block": 10, "weight": 5, "currentBlock": 10}	7	{"{\\"keywordId\\": 12}","{\\"keywordId\\": 13}"}	1	\N	t	13	1	uncommon
18	Reactive Cloak	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738979296/gated/jl8bcstmvld7vlzxdk9q.jpg", "publicId": "gated/jl8bcstmvld7vlzxdk9q"}	A full body cloak covered in reactive electrocells that alter its color scheme. A cheap alternative to the advanced scout suit.	{"armor": 1, "block": 4, "weight": 2}	3	{"{\\"keywordId\\": 13}","{\\"keywordId\\": 54}","{\\"keywordId\\": 55}"}	\N	\N	f	\N	1	uncommon
19	Fed-Killer	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738978762/gated/jsvvafxjdu2yczdaqv47.jpg", "publicId": "gated/jsvvafxjdu2yczdaqv47"}	The so called funeral suit, since it’s the last thing you wear before kicking the hornet’s nest. Heavy metal plates strung together by hopes and prayers.	{"armor": 5, "block": 6, "weight": 8}	4	{"{\\"keywordId\\": 13}"}	\N	\N	f	\N	1	common
16	Scarecrow Suit	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738979533/gated/cd6z49d8wsb5krr50vic.jpg", "publicId": "gated/cd6z49d8wsb5krr50vic"}	An unwieldy collection of trinkets said to ward off the paranormal.	{"ward": 1, "block": 10, "weight": 4}	6	{"{\\"keywordId\\": 13}"}	\N	\N	f	\N	1	uncommon
12	Crusader Armor	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738977782/gated/j6pwlmlauzuu41ay51mu.jpg", "publicId": "gated/j6pwlmlauzuu41ay51mu"}	It is said that Shaddaian warriors fought amidst their own artillery barrage.	{"armor": 4, "block": 8, "weight": 6}	8	{"{\\"keywordId\\": 13}","{\\"keywordId\\": 15}"}	\N	\N	f	\N	1	uncommon
13	FDR Scout Suit	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738978593/gated/ynzacgd1ym8lhao87upc.jpg", "publicId": "gated/ynzacgd1ym8lhao87upc"}	Federal design utilizing adaptive smart camo to conceal the wearer.	{"armor": 3, "block": 10, "weight": 5}	7	{"{\\"keywordId\\": 12}","{\\"keywordId\\": 13}"}	\N	\N	f	\N	1	uncommon
15	Judge Armor	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738978981/gated/nxasa9mf1nuk2ru1hqad.jpg", "publicId": "gated/nxasa9mf1nuk2ru1hqad"}	The last straw for Police combat. Judges are the most revered position on the force, drawing upon only the best AGU officers.	{"armor": 6, "block": 15, "power": 12}	50	{"{\\"keywordId\\": 16}","{\\"keywordId\\": 18}","{\\"keywordId\\": 17}"}	\N	\N	f	\N	1	blackMarket
24	FDR Scout Suit	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738978593/gated/ynzacgd1ym8lhao87upc.jpg", "publicId": "gated/ynzacgd1ym8lhao87upc"}	Federal design utilizing adaptive smart camo to conceal the wearer.	{"armor": 3, "block": 10, "weight": 5, "currentBlock": 10}	7	{"{\\"keywordId\\": 12}","{\\"keywordId\\": 13}"}	6	\N	t	13	1	uncommon
23	Lion's Regalia	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738979126/gated/ha4qaje5qqg9c6gaxsnx.jpg", "publicId": "gated/ha4qaje5qqg9c6gaxsnx"}	Usage of this armor outside of Noble control is forbidden. Its might is unparalleled. Not many survive an encounter with a Lion.	{"armor": 8, "block": 20, "power": 12, "weight": 7}	1000	{"{\\"keywordId\\": 14}","{\\"keywordId\\": 17}"}	\N	\N	f	\N	1	artifact
28	Ko Shin Hakuo	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736499997/gated/aj59liaqm2yfdd6phtuy.jpg", "publicId": "gated/aj59liaqm2yfdd6phtuy"}	An advanced federal power armor reserved for elite agents – or sold to fund their desperate bid for revival. Its onboard jet thrusters make it the king of armored mobility.	{"armor": 5, "block": 12, "power": 12, "weight": 6, "currentBlock": 12, "currentPower": 12}	60	{"{\\"keywordId\\": 16}","{\\"keywordId\\": 56}","{\\"keywordId\\": 17}"}	6	\N	t	21	1	blackMarket
29	Fed-Killer	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738978762/gated/jsvvafxjdu2yczdaqv47.jpg", "publicId": "gated/jsvvafxjdu2yczdaqv47"}	The so called funeral suit, since it’s the last thing you wear before kicking the hornet’s nest. Heavy metal plates strung together by hopes and prayers.	{"armor": 5, "block": 6, "weight": 8, "currentBlock": 6}	4	{"{\\"keywordId\\": 13}"}	9	\N	t	19	1	common
25	Reactive Cloak	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738979296/gated/jl8bcstmvld7vlzxdk9q.jpg", "publicId": "gated/jl8bcstmvld7vlzxdk9q"}	A full body cloak covered in reactive electrocells that alter its color scheme. A cheap alternative to the advanced scout suit.	{"armor": 1, "block": 4, "weight": 2, "currentBlock": 4}	3	{"{\\"keywordId\\": 13}","{\\"keywordId\\": 54}","{\\"keywordId\\": 55}"}	6	\N	t	18	1	uncommon
\.


--
-- Data for Name: BookEntry; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."BookEntry" (id, title, page, "sectionId", content) FROM stdin;
28	introduction	2	2	{"html": "<h1 dir=\\"ltr\\" style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">Intro to Attributes and Skills</span></h1><p dir=\\"ltr\\"><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">There are four primary attributes in </span><i><em style=\\"white-space: pre-wrap;\\">GatED</em></i><b><strong style=\\"white-space: pre-wrap;\\">:</strong></b></p><p><br></p><ol><li value=\\"1\\"><b><strong style=\\"white-space: pre-wrap;\\">Cybernetica – </strong></b><span style=\\"white-space: pre-wrap;\\">Technology and machinery. Affect change through devices.</span></li><li value=\\"2\\"><b><strong style=\\"white-space: pre-wrap;\\">Esoterica – </strong></b><span style=\\"white-space: pre-wrap;\\">Otherworldly and phenomena. Affect change through mysticism.&nbsp;</span></li><li value=\\"3\\"><b><strong style=\\"white-space: pre-wrap;\\">Peace – </strong></b><span style=\\"white-space: pre-wrap;\\">Suaveness, intellectualism. Affect change through cooperation.&nbsp;</span></li><li value=\\"4\\"><b><strong style=\\"white-space: pre-wrap;\\">Violence – </strong></b><span style=\\"white-space: pre-wrap;\\">Roughness and physicality. Affect change through aggression.</span></li></ol><p dir=\\"ltr\\"><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">Then, each attribute has its own sublist of skills:&nbsp;</span></p><p dir=\\"ltr\\"><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><b><strong style=\\"white-space: pre-wrap;\\">Cybernetica</strong></b></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><ul><li value=\\"1\\"><b><strong style=\\"white-space: pre-wrap;\\">Chromebits </strong></b><span style=\\"white-space: pre-wrap;\\">– Cybernetic enhancements</span></li><li value=\\"2\\"><b><strong style=\\"white-space: pre-wrap;\\">Hardwired </strong></b><span style=\\"white-space: pre-wrap;\\">– Machinery and electric grids</span></li><li value=\\"3\\"><b><strong style=\\"white-space: pre-wrap;\\">Motorized </strong></b><span style=\\"white-space: pre-wrap;\\">– Driving and vehicles</span></li><li value=\\"4\\"><b><strong style=\\"white-space: pre-wrap;\\">Networked </strong></b><span style=\\"white-space: pre-wrap;\\">– Diving and computers</span></li></ul></td></tr></tbody></table><p><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><b><strong style=\\"white-space: pre-wrap;\\">Esoterica</strong></b></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><ul><li value=\\"1\\"><b><strong style=\\"white-space: pre-wrap;\\">Gestalt </strong></b><span style=\\"white-space: pre-wrap;\\">– Human shared psyche</span></li><li value=\\"2\\"><b><strong style=\\"white-space: pre-wrap;\\">Godhead </strong></b><span style=\\"white-space: pre-wrap;\\">– Sleeping Giants, invocations</span></li><li value=\\"3\\"><b><strong style=\\"white-space: pre-wrap;\\">Mysticism </strong></b><span style=\\"white-space: pre-wrap;\\">– Fortunes, runes, omens</span></li><li value=\\"4\\"><b><strong style=\\"white-space: pre-wrap;\\">Outerworld </strong></b><span style=\\"white-space: pre-wrap;\\">– Souls, ghosts, phantoms</span></li></ul></td></tr></tbody></table><p><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><b><strong style=\\"white-space: pre-wrap;\\">Peace</strong></b></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><ul><li value=\\"1\\"><b><strong style=\\"white-space: pre-wrap;\\">Barter </strong></b><span style=\\"white-space: pre-wrap;\\">– Market knowledge and valuation</span></li><li value=\\"2\\"><b><strong style=\\"white-space: pre-wrap;\\">Erudition </strong></b><span style=\\"white-space: pre-wrap;\\">– Studious knowledge</span></li><li value=\\"3\\"><b><strong style=\\"white-space: pre-wrap;\\">Rhetoric </strong></b><span style=\\"white-space: pre-wrap;\\">– Speech and wordcraft</span></li><li value=\\"4\\"><b><strong style=\\"white-space: pre-wrap;\\">Treatment </strong></b><span style=\\"white-space: pre-wrap;\\">– First Aid and medicine</span></li></ul></td></tr></tbody></table><p><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><b><strong style=\\"white-space: pre-wrap;\\">Violence</strong></b></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><ul><li value=\\"1\\"><b><strong style=\\"white-space: pre-wrap;\\">Assault </strong></b><span style=\\"white-space: pre-wrap;\\">– Close quarters combat</span></li><li value=\\"2\\"><b><strong style=\\"white-space: pre-wrap;\\">Shooting </strong></b><span style=\\"white-space: pre-wrap;\\">– Gunnery and accuracy</span></li><li value=\\"3\\"><b><strong style=\\"white-space: pre-wrap;\\">Subterfuge </strong></b><span style=\\"white-space: pre-wrap;\\">– Sneaking and hiding</span></li><li value=\\"4\\"><b><strong style=\\"white-space: pre-wrap;\\">Threshold </strong></b><span style=\\"white-space: pre-wrap;\\">– Tolerance for suffering</span></li></ul></td></tr></tbody></table>", "nodes": {"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"tag": "h1", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Intro to Attributes and Skills", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "There are four primary attributes in ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "GatED", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"mode": "normal", "text": ":", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "ol", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Cybernetica – ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "Technology and machinery. Affect change through devices.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 2, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Esoterica – ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "Otherworldly and phenomena. Affect change through mysticism. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 3, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Peace – ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "Suaveness, intellectualism. Affect change through cooperation. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 4, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Violence – ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "Roughness and physicality. Affect change through aggression.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "number", "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Then, each attribute has its own sublist of skills: ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Cybernetica", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"tag": "ul", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Chromebits ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "– Cybernetic enhancements", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 2, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Hardwired ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "– Machinery and electric grids", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 3, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Motorized ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "– Driving and vehicles", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 4, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Networked ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "– Diving and computers", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "bullet", "direction": "ltr"}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Esoterica", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"tag": "ul", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Gestalt ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "– Human shared psyche", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 2, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Godhead ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "– Sleeping Giants, invocations", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 3, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Mysticism ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "– Fortunes, runes, omens", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 4, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Outerworld ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "– Souls, ghosts, phantoms", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "bullet", "direction": "ltr"}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Peace", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"tag": "ul", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Barter ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "– Market knowledge and valuation", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 2, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Erudition ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "– Studious knowledge", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 3, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Rhetoric ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "– Speech and wordcraft", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 4, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Treatment ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "– First Aid and medicine", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "bullet", "direction": "ltr"}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Violence", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"tag": "ul", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Assault ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "– Close quarters combat", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 2, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Shooting ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "– Gunnery and accuracy", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 3, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Subterfuge ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "– Sneaking and hiding", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 4, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Threshold ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "– Tolerance for suffering", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "bullet", "direction": "ltr"}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}], "direction": "ltr"}}}
29	examples	3	2	{"html": "<h1 dir=\\"ltr\\" style=\\"text-align: center;\\"><b><strong style=\\"white-space: pre-wrap;\\">Attributes and Skills</strong></b></h1><p dir=\\"ltr\\"><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">Attributes are broad concepts, fittingly, and can be used to categorize characters. They are also often prerequisites to certain feats or items. Skills are a bit more special though, as they represent total ways for players (and characters in general) to experience and view the world. A character can use a skill in any situation (to varying efficacy) and can either apply it to or learn about it contextually from said skill. Here’s an example:&nbsp;</span></p><p><br></p><p dir=\\"ltr\\" style=\\"padding-inline-start: 40px;\\"><i><em style=\\"white-space: pre-wrap;\\">Damien the Avenger is a Violence mained Assault and Marksman skill user. In other words, he’s a doorkicker and a nametaker.&nbsp;</em></i></p><p dir=\\"ltr\\" style=\\"padding-inline-start: 40px;\\"><br></p><p dir=\\"ltr\\" style=\\"padding-inline-start: 40px;\\"><i><em style=\\"white-space: pre-wrap;\\">Martõn the Mystic is an Esoterica mained Mysticism and Gestalt skill user. He’s the voodoo man, and strange is his game.&nbsp;</em></i></p><p dir=\\"ltr\\" style=\\"padding-inline-start: 40px;\\"><br></p><p dir=\\"ltr\\" style=\\"padding-inline-start: 40px;\\"><i><em style=\\"white-space: pre-wrap;\\">Split Tully is a Cybernetica mained Motorized and Chromebits skill user. He’s the driver of the team’s custom racer.&nbsp;</em></i></p><p dir=\\"ltr\\" style=\\"padding-inline-start: 40px;\\"><br></p><p dir=\\"ltr\\" style=\\"padding-inline-start: 40px;\\"><i><em style=\\"white-space: pre-wrap;\\">Upon entering a rival hashden, they each alert the GM that they’d like to take in their surroundings (Damien says, “I wanna know what the fuck is going on”) with their favored skills.&nbsp;</em></i></p><p dir=\\"ltr\\" style=\\"padding-inline-start: 40px;\\"><i><em style=\\"white-space: pre-wrap;\\">Damien rolls Assault.</em></i></p><p dir=\\"ltr\\" style=\\"padding-inline-start: 40px;\\"><i><em style=\\"white-space: pre-wrap;\\">Martõn rolls Mysticism.</em></i></p><p dir=\\"ltr\\" style=\\"padding-inline-start: 40px;\\"><i><em style=\\"white-space: pre-wrap;\\">Split rolls Chromebits (He was talked down from rolling Motorized.)</em></i></p><p dir=\\"ltr\\" style=\\"padding-inline-start: 40px;\\"><br></p><p dir=\\"ltr\\" style=\\"padding-inline-start: 40px;\\"><i><em style=\\"white-space: pre-wrap;\\">Damien counts the number of producers and guards in the room. He plots routes through the furniture. He draws his prized pneumatic mace.&nbsp;</em></i></p><p dir=\\"ltr\\" style=\\"padding-inline-start: 40px;\\"><i><em style=\\"white-space: pre-wrap;\\">Martõn expands his mind and detects the reinforcements upstairs, and learns as well that this hash is laced with that esoteric powder they’ve been pursuing.&nbsp;</em></i></p><p dir=\\"ltr\\" style=\\"padding-inline-start: 40px;\\"><i><em style=\\"white-space: pre-wrap;\\">Split picks out a few augmented guards and alerts Damien to their ‘stats’. He also sees a makeshift workstation in the corner, implying one of these goons is a real chromehead.&nbsp;</em></i></p><p><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">In this example, we see each character is using the skill as a means of perception and conceptualizing. </span><i><em style=\\"white-space: pre-wrap;\\">GatED </em></i><span style=\\"white-space: pre-wrap;\\">skills can be summarized as follows: “When all you have is a hammer, everything starts looking like a nail.” Characters see the world through a limited lens, just like people, and their habits and traits shape their perception of things. Player characters are thus encouraged to round themselves out, by taking other skills to represent lesser vectors of their character, and should often use those skills in conjunction with their main skill or two. While only one roll can be made at a time, a character can certainly spend extra time taking a varied stock of the situation.&nbsp;</span></p><p><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">What if a player wants to use an out of place skill? Generally, the GM can let them, while also telling the player that they may have decreased efficacy or increased risk. In specific situations, the GM may decide that the roll cannot be replaced, or at least cannot be replaced by the player’s current suggestion. Here’s another example:&nbsp;</span></p><p><br></p><p dir=\\"ltr\\" style=\\"padding-inline-start: 40px;\\"><i><em style=\\"white-space: pre-wrap;\\">Damien is interrogating one of their rivals after a brutal slaughter in the hashden. The rival spills some beans, and the GM asks Damien to make an Erudition Check to confirm if the information is sensible. Damien’s Peace is 0. Damien’s Erudition is 0. Damien asks the GM if he can make an Assault Check to </em></i><u><i><em class=\\"editor-underline\\" style=\\"white-space: pre-wrap;\\">really</em></i></u><i><em style=\\"white-space: pre-wrap;\\"> beat the truth outta this goon. The GM furrows his brow, but relents by telling Damien that he can, but the risk for failure is incapacitating the guy, and that the efficacy of success is limited compared to the Peace Roll.&nbsp;</em></i></p><p dir=\\"ltr\\" style=\\"padding-inline-start: 40px;\\"><br></p><p dir=\\"ltr\\" style=\\"padding-inline-start: 40px;\\"><i><em style=\\"white-space: pre-wrap;\\">Damien flat out fails and clocks the dude. He shrugs and never considers how big the mechanical implications of this situation actually were.&nbsp;</em></i></p><p><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">Finally, and obviously, Skills can simply be used to perform the action described by them. Assault can hit, Motorized can drive, and Rhetoric can filibuster. </span></p>", "nodes": {"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"tag": "h1", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Attributes and Skills", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "Attributes are broad concepts, fittingly, and can be used to categorize characters. They are also often prerequisites to certain feats or items. Skills are a bit more special though, as they represent total ways for players (and characters in general) to experience and view the world. A character can use a skill in any situation (to varying efficacy) and can either apply it to or learn about it contextually from said skill. Here’s an example: ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 1, "version": 1, "children": [{"mode": "normal", "text": "Damien the Avenger is a Violence mained Assault and Marksman skill user. In other words, he’s a doorkicker and a nametaker. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 2}, {"type": "paragraph", "format": "", "indent": 1, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 1, "version": 1, "children": [{"mode": "normal", "text": "Martõn the Mystic is an Esoterica mained Mysticism and Gestalt skill user. He’s the voodoo man, and strange is his game. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 2}, {"type": "paragraph", "format": "", "indent": 1, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 1, "version": 1, "children": [{"mode": "normal", "text": "Split Tully is a Cybernetica mained Motorized and Chromebits skill user. He’s the driver of the team’s custom racer. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 2}, {"type": "paragraph", "format": "", "indent": 1, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 1, "version": 1, "children": [{"mode": "normal", "text": "Upon entering a rival hashden, they each alert the GM that they’d like to take in their surroundings (Damien says, “I wanna know what the fuck is going on”) with their favored skills. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 2}, {"type": "paragraph", "format": "", "indent": 1, "version": 1, "children": [{"mode": "normal", "text": "Damien rolls Assault.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 2}, {"type": "paragraph", "format": "", "indent": 1, "version": 1, "children": [{"mode": "normal", "text": "Martõn rolls Mysticism.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 2}, {"type": "paragraph", "format": "", "indent": 1, "version": 1, "children": [{"mode": "normal", "text": "Split rolls Chromebits (He was talked down from rolling Motorized.)", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 2}, {"type": "paragraph", "format": "", "indent": 1, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 1, "version": 1, "children": [{"mode": "normal", "text": "Damien counts the number of producers and guards in the room. He plots routes through the furniture. He draws his prized pneumatic mace. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 2}, {"type": "paragraph", "format": "", "indent": 1, "version": 1, "children": [{"mode": "normal", "text": "Martõn expands his mind and detects the reinforcements upstairs, and learns as well that this hash is laced with that esoteric powder they’ve been pursuing. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 2}, {"type": "paragraph", "format": "", "indent": 1, "version": 1, "children": [{"mode": "normal", "text": "Split picks out a few augmented guards and alerts Damien to their ‘stats’. He also sees a makeshift workstation in the corner, implying one of these goons is a real chromehead. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 2}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "In this example, we see each character is using the skill as a means of perception and conceptualizing. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "GatED ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"mode": "normal", "text": "skills can be summarized as follows: “When all you have is a hammer, everything starts looking like a nail.” Characters see the world through a limited lens, just like people, and their habits and traits shape their perception of things. Player characters are thus encouraged to round themselves out, by taking other skills to represent lesser vectors of their character, and should often use those skills in conjunction with their main skill or two. While only one roll can be made at a time, a character can certainly spend extra time taking a varied stock of the situation. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "What if a player wants to use an out of place skill? Generally, the GM can let them, while also telling the player that they may have decreased efficacy or increased risk. In specific situations, the GM may decide that the roll cannot be replaced, or at least cannot be replaced by the player’s current suggestion. Here’s another example: ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 1, "version": 1, "children": [{"mode": "normal", "text": "Damien is interrogating one of their rivals after a brutal slaughter in the hashden. The rival spills some beans, and the GM asks Damien to make an Erudition Check to confirm if the information is sensible. Damien’s Peace is 0. Damien’s Erudition is 0. Damien asks the GM if he can make an Assault Check to ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"mode": "normal", "text": "really", "type": "text", "style": "", "detail": 0, "format": 10, "version": 1}, {"mode": "normal", "text": " beat the truth outta this goon. The GM furrows his brow, but relents by telling Damien that he can, but the risk for failure is incapacitating the guy, and that the efficacy of success is limited compared to the Peace Roll. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 2}, {"type": "paragraph", "format": "", "indent": 1, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 1, "version": 1, "children": [{"mode": "normal", "text": "Damien flat out fails and clocks the dude. He shrugs and never considers how big the mechanical implications of this situation actually were. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 2}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "Finally, and obviously, Skills can simply be used to perform the action described by them. Assault can hit, Motorized can drive, and Rhetoric can filibuster. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "textFormat": 1}}}
30	overview	4	2	{"html": "<h1 dir=\\"ltr\\" style=\\"text-align: center;\\"><b><strong style=\\"white-space: pre-wrap;\\">Attributes and Skills</strong></b></h1><p dir=\\"ltr\\"><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">Let’s take a moment here and break down the attributes and skills individually. Let’s start with:&nbsp;</span></p><p dir=\\"ltr\\"><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><b><strong style=\\"white-space: pre-wrap;\\">Cybernetica - </strong></b><span style=\\"white-space: pre-wrap;\\">Interacting with machinery and technology, and using such devices for action and change. Knowledge regarding engineering and specifications.&nbsp;</span></p></td></tr></tbody></table><p><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><b><strong style=\\"white-space: pre-wrap;\\">Esoterica - </strong></b><span style=\\"white-space: pre-wrap;\\">The supernatural, and its usage. Learning mystical facts and things detached from the material world. Using supernatural abilities that stem from the mind and the things behind the veil.&nbsp;</span></p></td></tr></tbody></table><p><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><b><strong style=\\"white-space: pre-wrap;\\">Peace - </strong></b><span style=\\"white-space: pre-wrap;\\">The ability to enact things by words or ideas. Applying the social system as it’s meant to function. The softer hand of action, changing minds coaxing information.&nbsp;</span></p></td></tr></tbody></table><p><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><b><strong style=\\"white-space: pre-wrap;\\">Violence - </strong></b><span style=\\"white-space: pre-wrap;\\">The ability to enact things by force. Whether aggressive, calculated, or somewhere chaotically in between, violence represents force and often physical action.&nbsp;</span></p></td></tr></tbody></table><p><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">So we can see that although not mutually exclusive, these skills can be arranged as perpendicular spectrums. Violence and Peace, Cybernetica and Esoterica.&nbsp;</span></p><p><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">Of course, these broad categories are a great way to quickly categorize characters, and players should put points into an attribute knowing that there will be perks and items with Attribute based prerequisites. But the real meat of the game and of its characters comes from the following, skills:&nbsp;</span></p><p><br></p><h3 dir=\\"ltr\\" style=\\"text-align: center;\\"><b><strong style=\\"white-space: pre-wrap;\\">Cybernetica Skills</strong></b></h3><p dir=\\"ltr\\"><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><b><strong style=\\"white-space: pre-wrap;\\">Chromebits - </strong></b><span style=\\"white-space: pre-wrap;\\">Cybernetic augments, body replacement, nanotech. Enhanced biology, cellular augmentation, brainchips and neurotech. Using the technology as well as knowing it.&nbsp;Identifying cyber-enhanced individuals, as well as their capabilities. Identifying relevant weaknesses in a system.</span></p></td></tr></tbody></table><p><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><b><strong style=\\"white-space: pre-wrap;\\">Hardwired - </strong></b><span style=\\"white-space: pre-wrap;\\">Traditional machinery and electronics. Surveillance, drones, explosives, and other military tech. Appliances, radio, jerry-rigging, ‘analogue tech’. Electricity and power grids, security, infrastructure.&nbsp;Identifying power discrepancies, analyzing opposing security measures, recalling structural information</span></p></td></tr></tbody></table><p><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><b><strong style=\\"white-space: pre-wrap;\\">Motorized - </strong></b><span style=\\"white-space: pre-wrap;\\">Vehicles, motors, roads, highways, and street laws. Anything on the ground, in the sea, or in the air. Knowledge of and ability to operate. Fingerless gloves. ETAs, shortcuts, and special maneuvers.&nbsp;Identifying cars by sound, aerial vehicles by sound or wash. Planning intercepts on highways, streets. Dead ends and cutbacks.&nbsp;</span></p></td></tr></tbody></table><p><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><b><strong style=\\"white-space: pre-wrap;\\">Networked - </strong></b><span style=\\"white-space: pre-wrap;\\">Computers, digital devices, cellphones, wireless information, bugs, viruses, wyrms, hacking, digital security. Full Immersion Diving, remote hacking. Digital systems and AI.&nbsp;Tracking power and thermal activity, finding hubs and more. Tracking anonymous users, deciphering personal information. Preventing digital incursions and protecting private faculties.&nbsp;</span></p></td></tr></tbody></table><p style=\\"text-align: center;\\"><br></p><h3 dir=\\"ltr\\" style=\\"text-align: center;\\"><b><strong style=\\"white-space: pre-wrap;\\">Esoterica Skills</strong></b></h3><p dir=\\"ltr\\"><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><b><strong style=\\"white-space: pre-wrap;\\">Gestalt - </strong></b><span style=\\"white-space: pre-wrap;\\">Shared human psyche, subconsciousness, mental links, telepathy, thought inception. Area empathy, local psychic avatars.&nbsp;Awareness of emotional spikes, psychic states, and ongoing inceptions, and other gestalt activity.</span></p></td></tr></tbody></table><p><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><b><strong style=\\"white-space: pre-wrap;\\">Godhead - </strong></b><span style=\\"white-space: pre-wrap;\\">The Sleeping Giants, the age before man, the stars, the dreamworld. The endtimes, godly influence and resisting it. Inducing or channeling astral thought. Multidimensional benders. Celestial alignment.&nbsp;Awareness of portals to the dreamworld, Sleeping Eyes, Watchers, and more. Knowledge of dreams and dissecting their content.&nbsp;</span></p></td></tr></tbody></table><p><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><b><strong style=\\"white-space: pre-wrap;\\">Mysticism - </strong></b><span style=\\"white-space: pre-wrap;\\">The Binding Art, spiritualism, tradition, fortunetelling, farsight. Defend against and ward off the other Esoterica. Bind and seal locations of interest. Runes, Ofudas, totems, and other primitive objects contain spiritual power.&nbsp;A light awareness of the presence of all kinds of Esoterica, but less specific about their ongoings. Knowledge of the secret languages and codes of the various Mystic Communities, and a more welcome embrace by those communities.&nbsp;</span></p></td></tr></tbody></table><p><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><b><strong style=\\"white-space: pre-wrap;\\">Outerworld - </strong></b><span style=\\"white-space: pre-wrap;\\">What remains after death. Trapped spiritual essence, haunting ghosts, possessing phantoms. The awareness of such things, and the ability to use them. Minor possessions to be used, major possessions carry risk. How to exorcise or contain ghosts of any kind. Awareness of ghostly apparitions, knowledge of their kind and effects they have. Perception of looming imminent death.&nbsp;</span></p></td></tr></tbody></table><p><br></p><p style=\\"text-align: center;\\"><br></p><h3 dir=\\"ltr\\" style=\\"text-align: center;\\"><b><strong style=\\"white-space: pre-wrap;\\">Peace Skills</strong></b></h3><p dir=\\"ltr\\"><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><b><strong style=\\"white-space: pre-wrap;\\">Barter - </strong></b><span style=\\"white-space: pre-wrap;\\">The universal tongue, money. All things value, trade, bartering, mercantile. Pawning things, identifying market items. Running calculations. Constructing deals, paperwork, agreements. Dealing with a single ramen vendor or a Corporate Executive alike.&nbsp;Costs, income, liquid and solid asset comparison. Logistics, real estate.&nbsp;</span></p></td></tr></tbody></table><p><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><b><strong style=\\"white-space: pre-wrap;\\">Erudition - </strong></b><span style=\\"white-space: pre-wrap;\\">Knowledge, studiousness, encyclopedic recall. Mental logic, abstract concepts, history, culture, art and the like. Modern media and past literature. Relating all of the previous subjects as well as understanding them. Book knowledge. Raw data.&nbsp;Perceiving intellect, reading through massive amounts of information, comparing information received for trustworthiness.&nbsp;</span></p></td></tr></tbody></table><p><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><b><strong style=\\"white-space: pre-wrap;\\">Rhetoric - </strong></b><span style=\\"white-space: pre-wrap;\\">Speech, the great mover of the masses. Lying, politics, diplomacy, surrender, charm and more. Listening to others speak, identifying speech patterns and inconsistencies in other’s voices. Mimicry and performance.&nbsp;Picking out keywords in unknown languages. Getting a feel for a crowd. Social empathy.&nbsp;</span></p></td></tr></tbody></table><p><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><b><strong style=\\"white-space: pre-wrap;\\">Treatment - </strong></b><span style=\\"white-space: pre-wrap;\\">Medical services and knowledge. First aid, surgery, wound care, sickness, side effects. Clinical knowledge about pharmaceuticals. Steady hands and calm nerves. Biological knowledge.&nbsp;Examinations, determinations of conditions. Segues into cybernetic identification (by comparison to biology). Identification of drugs or combat stimulants in an individual.&nbsp;</span></p></td></tr></tbody></table><p><br></p><p style=\\"text-align: center;\\"><br></p><h3 dir=\\"ltr\\" style=\\"text-align: center;\\"><b><strong style=\\"white-space: pre-wrap;\\">Violence Skills</strong></b></h3><p dir=\\"ltr\\"><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><b><strong style=\\"white-space: pre-wrap;\\">Assault </strong></b><span style=\\"white-space: pre-wrap;\\">- Fisticuffs, hammers, blades. Anything up close and personal. Threatening people with violence. Breaking things. Breaking down things. Breaking apart things. Grappling, kung fu, and tackles. Using your muscles, throwing something, coaxing out speed. Certain firearms.&nbsp;Planning routes, noticing an opponent’s strength, contemplating outgoing damage and returning damage.</span></p></td></tr></tbody></table><p><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><b><strong style=\\"white-space: pre-wrap;\\">Shooting - </strong></b><span style=\\"white-space: pre-wrap;\\">Gun. Shot, slung, launched, or otherwise using a projectile. Threatening people… with guns! Blasting things, suppressing fire, sniping, called shots. Most firearms.&nbsp;Planning shots, identifying firing locations, recognizing caliber by sound, examining armor or point defense systems.&nbsp;</span></p></td></tr></tbody></table><p><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><b><strong style=\\"white-space: pre-wrap;\\">Subterfuge - </strong></b><span style=\\"white-space: pre-wrap;\\">Sneaking, hiding, quiet kills, vital strikes. Physical deception, feints, parries. Remaining in an awkward place. Fakeouts, false documents, disguises. Infiltration and information gathering. Eavesdropping.&nbsp;Taking stock of guards and security systems. Planning points of ingress and egress. Tracking or taking note of someone.&nbsp;</span></p></td></tr></tbody></table><p><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><b><strong style=\\"white-space: pre-wrap;\\">Threshold - </strong></b><span style=\\"white-space: pre-wrap;\\">Pain tolerance, endurance, and physical limitations. Drugs, damage, fatigue, poison, and alcohol. Cybernetic limitations, bodily strength, immune health. Simple feats of strength, torque not acceleration, climbing, running, swimming.&nbsp;</span></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">Taking stock of injuries, medical condition. Bodily knowledge, awareness of foreign agents. Contemplating possible damage, identifying certain substances by </span><i><em style=\\"white-space: pre-wrap;\\">experience.&nbsp;</em></i></p></td></tr></tbody></table><p><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">So, that’s skills. They’re varied, and wide. Go with your gut. If you think trying to eat a tire is a Violence Threshold check, then send it. If you think someone can be intimidated by an Esoterica Godhead check, as the </span><i><em style=\\"white-space: pre-wrap;\\">Religious </em></i><span style=\\"white-space: pre-wrap;\\">man spouts off about the apocalypse of the universe, then absolutely. What you should be most aware of is Toe Stepping. With such a flexible system, you, the GM (and you players), need to make sure that certain skills don’t invalidate others, or that player archetypes are clearly defined. (</span><i><em style=\\"white-space: pre-wrap;\\">No, you can’t make a Violence Assault check to punch the bookshelf until the book you need falls out. Ask Viggo the Erudite to come help you.)</em></i></p><p dir=\\"ltr\\"><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">As an endcap to skills, let me address the players. GMs should be thinking about this, but the players really need to envision this. Your skills are not just the things your character does, it’s their worldview. Their archetype. It’s the very nature of the character. Someone whose highest rated skill is Assault should tie that into the character description and behavior. (</span><i><em style=\\"white-space: pre-wrap;\\">He’s a lithe assassin, with blades hidden in various places all over his body and a long beruned katana on his hip.) </em></i><span style=\\"white-space: pre-wrap;\\">Or. </span><i><em style=\\"white-space: pre-wrap;\\">(He’s a brick of a human, square as his two handed pneumohammer.) </em></i><span style=\\"white-space: pre-wrap;\\">For both players and GM, designing characters which visually represent their skills is both satisfying and mechanically advisable. The GM doesn’t have to give everything away, </span><i><em style=\\"white-space: pre-wrap;\\">(Thin lines tracing her jaw give away her advanced prosthetics, but little can be discerned about them.) </em></i><span style=\\"white-space: pre-wrap;\\">but knowing that a character is maining Cybernetica the moment you meet them allows for planning, and when RPG players begin to plan, tension is bound to occur. </span></p>", "nodes": {"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"tag": "h1", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Attributes and Skills", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Let’s take a moment here and break down the attributes and skills individually. Let’s start with: ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Cybernetica - ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "Interacting with machinery and technology, and using such devices for action and change. Knowledge regarding engineering and specifications. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 1}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Esoterica - ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "The supernatural, and its usage. Learning mystical facts and things detached from the material world. Using supernatural abilities that stem from the mind and the things behind the veil. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 1}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Peace - ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "The ability to enact things by words or ideas. Applying the social system as it’s meant to function. The softer hand of action, changing minds coaxing information. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 1}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Violence - ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "The ability to enact things by force. Whether aggressive, calculated, or somewhere chaotically in between, violence represents force and often physical action. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 1}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "So we can see that although not mutually exclusive, these skills can be arranged as perpendicular spectrums. Violence and Peace, Cybernetica and Esoterica. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "Of course, these broad categories are a great way to quickly categorize characters, and players should put points into an attribute knowing that there will be perks and items with Attribute based prerequisites. But the real meat of the game and of its characters comes from the following, skills: ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Cybernetica Skills", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Chromebits - ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "Cybernetic augments, body replacement, nanotech. Enhanced biology, cellular augmentation, brainchips and neurotech. Using the technology as well as knowing it. Identifying cyber-enhanced individuals, as well as their capabilities. Identifying relevant weaknesses in a system.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 1}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Hardwired - ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "Traditional machinery and electronics. Surveillance, drones, explosives, and other military tech. Appliances, radio, jerry-rigging, ‘analogue tech’. Electricity and power grids, security, infrastructure. Identifying power discrepancies, analyzing opposing security measures, recalling structural information", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 1}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Motorized - ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "Vehicles, motors, roads, highways, and street laws. Anything on the ground, in the sea, or in the air. Knowledge of and ability to operate. Fingerless gloves. ETAs, shortcuts, and special maneuvers. Identifying cars by sound, aerial vehicles by sound or wash. Planning intercepts on highways, streets. Dead ends and cutbacks. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 1}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Networked - ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "Computers, digital devices, cellphones, wireless information, bugs, viruses, wyrms, hacking, digital security. Full Immersion Diving, remote hacking. Digital systems and AI. Tracking power and thermal activity, finding hubs and more. Tracking anonymous users, deciphering personal information. Preventing digital incursions and protecting private faculties. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 1}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Esoterica Skills", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Gestalt - ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "Shared human psyche, subconsciousness, mental links, telepathy, thought inception. Area empathy, local psychic avatars. Awareness of emotional spikes, psychic states, and ongoing inceptions, and other gestalt activity.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 1}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Godhead - ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "The Sleeping Giants, the age before man, the stars, the dreamworld. The endtimes, godly influence and resisting it. Inducing or channeling astral thought. Multidimensional benders. Celestial alignment. Awareness of portals to the dreamworld, Sleeping Eyes, Watchers, and more. Knowledge of dreams and dissecting their content. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 1}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Mysticism - ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "The Binding Art, spiritualism, tradition, fortunetelling, farsight. Defend against and ward off the other Esoterica. Bind and seal locations of interest. Runes, Ofudas, totems, and other primitive objects contain spiritual power. A light awareness of the presence of all kinds of Esoterica, but less specific about their ongoings. Knowledge of the secret languages and codes of the various Mystic Communities, and a more welcome embrace by those communities. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 1}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Outerworld - ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "What remains after death. Trapped spiritual essence, haunting ghosts, possessing phantoms. The awareness of such things, and the ability to use them. Minor possessions to be used, major possessions carry risk. How to exorcise or contain ghosts of any kind. Awareness of ghostly apparitions, knowledge of their kind and effects they have. Perception of looming imminent death. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 1}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Peace Skills", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Barter - ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "The universal tongue, money. All things value, trade, bartering, mercantile. Pawning things, identifying market items. Running calculations. Constructing deals, paperwork, agreements. Dealing with a single ramen vendor or a Corporate Executive alike. Costs, income, liquid and solid asset comparison. Logistics, real estate. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 1}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Erudition - ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "Knowledge, studiousness, encyclopedic recall. Mental logic, abstract concepts, history, culture, art and the like. Modern media and past literature. Relating all of the previous subjects as well as understanding them. Book knowledge. Raw data. Perceiving intellect, reading through massive amounts of information, comparing information received for trustworthiness. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 1}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Rhetoric - ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "Speech, the great mover of the masses. Lying, politics, diplomacy, surrender, charm and more. Listening to others speak, identifying speech patterns and inconsistencies in other’s voices. Mimicry and performance. Picking out keywords in unknown languages. Getting a feel for a crowd. Social empathy. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 1}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Treatment - ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "Medical services and knowledge. First aid, surgery, wound care, sickness, side effects. Clinical knowledge about pharmaceuticals. Steady hands and calm nerves. Biological knowledge. Examinations, determinations of conditions. Segues into cybernetic identification (by comparison to biology). Identification of drugs or combat stimulants in an individual. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 1}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Violence Skills", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Assault ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "- Fisticuffs, hammers, blades. Anything up close and personal. Threatening people with violence. Breaking things. Breaking down things. Breaking apart things. Grappling, kung fu, and tackles. Using your muscles, throwing something, coaxing out speed. Certain firearms. Planning routes, noticing an opponent’s strength, contemplating outgoing damage and returning damage.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 1}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Shooting - ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "Gun. Shot, slung, launched, or otherwise using a projectile. Threatening people… with guns! Blasting things, suppressing fire, sniping, called shots. Most firearms. Planning shots, identifying firing locations, recognizing caliber by sound, examining armor or point defense systems. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 1}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Subterfuge - ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "Sneaking, hiding, quiet kills, vital strikes. Physical deception, feints, parries. Remaining in an awkward place. Fakeouts, false documents, disguises. Infiltration and information gathering. Eavesdropping. Taking stock of guards and security systems. Planning points of ingress and egress. Tracking or taking note of someone. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 1}], "direction": "ltr", "textFormat": 1, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Threshold - ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "Pain tolerance, endurance, and physical limitations. Drugs, damage, fatigue, poison, and alcohol. Cybernetic limitations, bodily strength, immune health. Simple feats of strength, torque not acceleration, climbing, running, swimming. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Taking stock of injuries, medical condition. Bodily knowledge, awareness of foreign agents. Contemplating possible damage, identifying certain substances by ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "experience. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "So, that’s skills. They’re varied, and wide. Go with your gut. If you think trying to eat a tire is a Violence Threshold check, then send it. If you think someone can be intimidated by an Esoterica Godhead check, as the ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "Religious ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"mode": "normal", "text": "man spouts off about the apocalypse of the universe, then absolutely. What you should be most aware of is Toe Stepping. With such a flexible system, you, the GM (and you players), need to make sure that certain skills don’t invalidate others, or that player archetypes are clearly defined. (", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "No, you can’t make a Violence Assault check to punch the bookshelf until the book you need falls out. Ask Viggo the Erudite to come help you.)", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 2}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "As an endcap to skills, let me address the players. GMs should be thinking about this, but the players really need to envision this. Your skills are not just the things your character does, it’s their worldview. Their archetype. It’s the very nature of the character. Someone whose highest rated skill is Assault should tie that into the character description and behavior. (", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "He’s a lithe assassin, with blades hidden in various places all over his body and a long beruned katana on his hip.) ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"mode": "normal", "text": "Or. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "(He’s a brick of a human, square as his two handed pneumohammer.) ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"mode": "normal", "text": "For both players and GM, designing characters which visually represent their skills is both satisfying and mechanically advisable. The GM doesn’t have to give everything away, ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "(Thin lines tracing her jaw give away her advanced prosthetics, but little can be discerned about them.) ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"mode": "normal", "text": "but knowing that a character is maining Cybernetica the moment you meet them allows for planning, and when RPG players begin to plan, tension is bound to occur. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr"}}}
32	dice pools and rolls	6	3	{"html": "<h1 dir=\\"ltr\\" style=\\"text-align: center;\\"><b><strong style=\\"white-space: pre-wrap;\\">Dice Pools and Rolls</strong></b></h1><p dir=\\"ltr\\"><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">So, we have our attributes known and our skills read. Now we need to understand how to use them. Every character assigns values to their attributes and skills. Each of those numerical values becomes the character’s dice pool when attempting a Check or a Roll (used interchangeably depending on my inebriation). Any time a roll is called for, gather the Attribute Dice and the Skill dice. </span><i><em style=\\"white-space: pre-wrap;\\">GatED </em></i><span style=\\"white-space: pre-wrap;\\">uses six sided dice, or D6’s, because they’re common and they feel nice. I said that already.</span></p><p><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">So, the GM calls for a roll in the form of “Attribute Skill” roll, or check. “</span><i><em style=\\"white-space: pre-wrap;\\">I need a Violence Threshold check to hold in that burp, buddy.” </em></i><span style=\\"white-space: pre-wrap;\\">Sometimes, substituting an attribute for another might make more sense. </span><i><em style=\\"white-space: pre-wrap;\\">“I need a Peace Threshold check to hold in that burp, buddy.” </em></i><span style=\\"white-space: pre-wrap;\\">This isn’t how the system works. Attributes </span><i><em style=\\"white-space: pre-wrap;\\">govern</em></i><span style=\\"white-space: pre-wrap;\\"> skills, they remain associated with the skill in all situations. </span><i><em style=\\"white-space: pre-wrap;\\">Buuuuuuuut… </em></i><span style=\\"white-space: pre-wrap;\\">There’s nothing stopping you from doing that if you like. Let’s call it an optional feature.&nbsp;</span></p><p><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">The player then picks up a number of dice equal to his attribute, a number of dice equal to his skill, (maybe some extra dice), and rolls em. If a dice rolls a 5 or a 6, it’s considered a success. In most circumstances, one success does the trick. Other times, a Target Number (TN) of successes or a contest between two parties is necessary.&nbsp;</span></p><p><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">Some actions can have gradient success conditions. One success may be enough to accomplish the desired effect, but two (or more) successes handles it flawlessly. During Narrative Play, the GM is free to assemble these gradient successes at their leisure. </span><i><em style=\\"white-space: pre-wrap;\\">“You can attempt to climb the fence, but there’s barbed wire at the top, making it more dangerous and difficult. One success, you take one damage. Two or more, no damage. Either way, you get to the other side.”</em></i></p><p><br></p><h3 dir=\\"ltr\\" style=\\"text-align: center;\\"><b><strong style=\\"white-space: pre-wrap;\\">Dice Conditions</strong></b></h3><p dir=\\"ltr\\"><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Some traits will interact directly with the dice pool or the act of rolling.</em></i></p><p><br></p><ul><li value=\\"1\\"><b><strong style=\\"white-space: pre-wrap;\\">Booming: </strong></b><span style=\\"white-space: pre-wrap;\\">Dice that roll a 6 grant an additional success. (Can Stack)</span></li><li value=\\"2\\"><b><strong style=\\"white-space: pre-wrap;\\">Dooming: </strong></b><span style=\\"white-space: pre-wrap;\\">Dice that roll a 1 subtract a&nbsp; success from the final result. (Can Stack) </span></li><li value=\\"3\\"><b><strong style=\\"white-space: pre-wrap;\\">Lucky: </strong></b><span style=\\"white-space: pre-wrap;\\">Dice succeed on 4, 5, and 6.</span></li><li value=\\"4\\"><b><strong style=\\"white-space: pre-wrap;\\">Unlucky: </strong></b><span style=\\"white-space: pre-wrap;\\">Dice only succeed on 6.</span></li></ul></td></tr></tbody></table><p><br></p><h3 dir=\\"ltr\\" style=\\"text-align: center;\\"><b><strong style=\\"white-space: pre-wrap;\\">Multiple Conditions</strong></b></h3><p dir=\\"ltr\\"><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Booming and Dooming can both be active at once, but Lucky and Unlucky cancel each other out. Multiple instances of reroll can stack on different numbers, and any given dice can still only be rerolled once.&nbsp;</em></i></p></td></tr></tbody></table><p><br></p><h3 dir=\\"ltr\\" style=\\"text-align: center;\\"><b><strong style=\\"white-space: pre-wrap;\\">Summary</strong></b></h3><p dir=\\"ltr\\"><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><ul><li value=\\"1\\"><span style=\\"white-space: pre-wrap;\\">Roll dice equal to attribute + skill.</span></li><li value=\\"2\\"><span style=\\"white-space: pre-wrap;\\">A 5 or a 6 on a dice is a success.</span></li><li value=\\"3\\"><span style=\\"white-space: pre-wrap;\\">Target Number of successes required.&nbsp;</span></li><li value=\\"4\\"><span style=\\"white-space: pre-wrap;\\">Success may be a gradient.&nbsp;</span></li><li value=\\"5\\"><span style=\\"white-space: pre-wrap;\\">Dice Conditions interact with the roll.</span></li></ul></td></tr></tbody></table><p dir=\\"ltr\\"><br></p>", "nodes": {"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"tag": "h1", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Dice Pools and Rolls", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "So, we have our attributes known and our skills read. Now we need to understand how to use them. Every character assigns values to their attributes and skills. Each of those numerical values becomes the character’s dice pool when attempting a Check or a Roll (used interchangeably depending on my inebriation). Any time a roll is called for, gather the Attribute Dice and the Skill dice. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "GatED ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"mode": "normal", "text": "uses six sided dice, or D6’s, because they’re common and they feel nice. I said that already.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "So, the GM calls for a roll in the form of “Attribute Skill” roll, or check. “", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "I need a Violence Threshold check to hold in that burp, buddy.” ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"mode": "normal", "text": "Sometimes, substituting an attribute for another might make more sense. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "“I need a Peace Threshold check to hold in that burp, buddy.” ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"mode": "normal", "text": "This isn’t how the system works. Attributes ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "govern", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"mode": "normal", "text": " skills, they remain associated with the skill in all situations. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "Buuuuuuuut… ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"mode": "normal", "text": "There’s nothing stopping you from doing that if you like. Let’s call it an optional feature. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "The player then picks up a number of dice equal to his attribute, a number of dice equal to his skill, (maybe some extra dice), and rolls em. If a dice rolls a 5 or a 6, it’s considered a success. In most circumstances, one success does the trick. Other times, a Target Number (TN) of successes or a contest between two parties is necessary. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "Some actions can have gradient success conditions. One success may be enough to accomplish the desired effect, but two (or more) successes handles it flawlessly. During Narrative Play, the GM is free to assemble these gradient successes at their leisure. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "“You can attempt to climb the fence, but there’s barbed wire at the top, making it more dangerous and difficult. One success, you take one damage. Two or more, no damage. Either way, you get to the other side.”", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Dice Conditions", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Some traits will interact directly with the dice pool or the act of rolling.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 2}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 2}, {"tag": "ul", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Booming: ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "Dice that roll a 6 grant an additional success. (Can Stack)", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 1}, {"type": "listitem", "value": 2, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Dooming: ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "Dice that roll a 1 subtract a  success from the final result. (Can Stack) ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 1}, {"type": "listitem", "value": 3, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Lucky: ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "Dice succeed on 4, 5, and 6.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 1}, {"type": "listitem", "value": 4, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Unlucky: ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "Dice only succeed on 6.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 1}], "listType": "bullet", "direction": "ltr", "textFormat": 1}], "direction": "ltr", "textFormat": 2, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 2}], "direction": "ltr", "textFormat": 2}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Multiple Conditions", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Booming and Dooming can both be active at once, but Lucky and Unlucky cancel each other out. Multiple instances of reroll can stack on different numbers, and any given dice can still only be rerolled once. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 2}], "direction": "ltr", "textFormat": 2, "headerState": 0, "backgroundColor": null}], "direction": "ltr", "textFormat": 2}], "direction": "ltr", "textFormat": 2}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Summary", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"tag": "ul", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Roll dice equal to attribute + skill.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 2, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "A 5 or a 6 on a dice is a success.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 3, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Target Number of successes required. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 4, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Success may be a gradient. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 5, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Dice Conditions interact with the roll.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "bullet", "direction": "ltr"}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "textFormat": 1}}}
33	pushing it	7	3	{"html": "<h1 dir=\\"ltr\\" style=\\"text-align: center;\\"><b><strong style=\\"white-space: pre-wrap;\\">Pushing It and&nbsp;</strong></b></h1><h1 dir=\\"ltr\\" style=\\"text-align: center;\\"><b><strong style=\\"white-space: pre-wrap;\\">Collective Action</strong></b></h1><p dir=\\"ltr\\"><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">Often, you may find yourself attempting a roll you have no points in, or one in which you fear you won’t have enough. In that scenario, you have two options. You can either Push It or utilize Collective Action. Of course, you never have to do either. Choosing neither means automatically failing whatever check or contest was forced upon you. If a player wishes to Push It, they can spend either 1 Health or 1 Sanity to add +2 Dice to their roll. You can only push once per roll. The health or sanity cost increases by 1 each time you Push It in a single scene.</span></p><p><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">Otherwise, multiple characters can come together to perform Collective Action. When performing Collective Action, all of the players add their dice pools together, utilizing the same skill. In whatever phase of the game the players are in (meaning whatever scale of time) Collective Action consumes the turn for all involved. Often times, Collective Action is unavailable in combat due to Initiative order, but if you say pretty please with sugar on top the GM might let you give up your entire turn to do one Collective Action on someone else’s.&nbsp;</span></p><p dir=\\"ltr\\"><br><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">What if you can’t Push It (or don’t want to) but have been forced to use a particular skill that you happen to have 0 points in. In that case, you can make a Desperation Roll. You receive 1 die which abides by the normal rules for success, but has an additional penalty for rolling a 1. If a Desperation Die rolls a 1, it is called a Critical Failure, and the GM should add some sort of extravagant and dire (but hopefully fun?) consequence to the result. Sometimes, Dooming Rolls that end up with negative successes can be given Critical Failures as well, but this an optional rule if anything. Across the page are some examples of critical fails and the varied consequences they may entail.&nbsp;</span></p><p><br></p><table class=\\"editor-table\\"><colgroup><col><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Viggo the Erudite is on the run from library security (who are surprisingly well armed). He makes a Desperate Assault roll to hop a chainlink fence, critically fails it, and pulls the whole fence down on top of him. He’s booked for misdemeanor Late Fees.&nbsp;</em></i></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Hammerhead Grammo, famed warrior, is signing on to a new mercenary company and needs to make a Desperate Barter roll to decipher his contract. He critically fails it, and has to wear corporate advertisement during his operations.&nbsp;</em></i></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">In order to resist the assault on his mind, Leovin Erstadt, the scorned scion of a dead noble family, needs to make a Desperate Gestalt roll. He critically fails it, and instantly becomes Deranged.&nbsp;&nbsp;</em></i></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">When Finn the Driver is knocked out, shotgun rider and combatant Corporal Split has to make a Desperate Motorized Check. He critically fails, and sends the car careening to the sidewall, wrecking it.&nbsp;</em></i></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">After being caught in a Wicker Man’s maze, John Elroy, spokesman for the Con-El Construction Union, needs to make a Desperate Godhead roll. He criticall fails it, and winds up accidentally proceeding further into the trap.&nbsp;</em></i></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">After a firefight in a Brothel, Kimino Torres, street ninja, finds his favorite hooker bleeding out. He attempts a Desperate Treatment roll to stabilize her, and critically fails it, giving her an overdose of stimulants and coagulants that kills her.&nbsp;</em></i></p></td></tr></tbody></table>", "nodes": {"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"tag": "h1", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Pushing It and ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr"}, {"tag": "h1", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Collective Action", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "Often, you may find yourself attempting a roll you have no points in, or one in which you fear you won’t have enough. In that scenario, you have two options. You can either Push It or utilize Collective Action. Of course, you never have to do either. Choosing neither means automatically failing whatever check or contest was forced upon you. If a player wishes to Push It, they can spend either 1 Health or 1 Sanity to add +2 Dice to their roll. You can only push once per roll. The health or sanity cost increases by 1 each time you Push It in a single scene.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "Otherwise, multiple characters can come together to perform Collective Action. When performing Collective Action, all of the players add their dice pools together, utilizing the same skill. In whatever phase of the game the players are in (meaning whatever scale of time) Collective Action consumes the turn for all involved. Often times, Collective Action is unavailable in combat due to Initiative order, but if you say pretty please with sugar on top the GM might let you give up your entire turn to do one Collective Action on someone else’s. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"type": "linebreak", "version": 1}, {"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "What if you can’t Push It (or don’t want to) but have been forced to use a particular skill that you happen to have 0 points in. In that case, you can make a Desperation Roll. You receive 1 die which abides by the normal rules for success, but has an additional penalty for rolling a 1. If a Desperation Die rolls a 1, it is called a Critical Failure, and the GM should add some sort of extravagant and dire (but hopefully fun?) consequence to the result. Sometimes, Dooming Rolls that end up with negative successes can be given Critical Failures as well, but this an optional rule if anything. Across the page are some examples of critical fails and the varied consequences they may entail. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Viggo the Erudite is on the run from library security (who are surprisingly well armed). He makes a Desperate Assault roll to hop a chainlink fence, critically fails it, and pulls the whole fence down on top of him. He’s booked for misdemeanor Late Fees. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Hammerhead Grammo, famed warrior, is signing on to a new mercenary company and needs to make a Desperate Barter roll to decipher his contract. He critically fails it, and has to wear corporate advertisement during his operations. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "In order to resist the assault on his mind, Leovin Erstadt, the scorned scion of a dead noble family, needs to make a Desperate Gestalt roll. He critically fails it, and instantly becomes Deranged.  ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "When Finn the Driver is knocked out, shotgun rider and combatant Corporal Split has to make a Desperate Motorized Check. He critically fails, and sends the car careening to the sidewall, wrecking it. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "After being caught in a Wicker Man’s maze, John Elroy, spokesman for the Con-El Construction Union, needs to make a Desperate Godhead roll. He criticall fails it, and winds up accidentally proceeding further into the trap. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "After a firefight in a Brothel, Kimino Torres, street ninja, finds his favorite hooker bleeding out. He attempts a Desperate Treatment roll to stabilize her, and critically fails it, giving her an overdose of stimulants and coagulants that kills her. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}], "direction": null}], "direction": "ltr"}}}
31	introduction	5	3	{"html": "<h1 dir=\\"ltr\\" style=\\"text-align: center;\\"><b><strong style=\\"white-space: pre-wrap;\\">Mechanics</strong></b></h1><p dir=\\"ltr\\"><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">In </span><i><em style=\\"white-space: pre-wrap;\\">GatED</em></i><b><strong style=\\"white-space: pre-wrap;\\">, </strong></b><span style=\\"white-space: pre-wrap;\\">characters possess four attributes, and each attribute possesses four skills. Each roll made by any character will be in the form of Attribute Dice + Skill Dice. </span><i><em style=\\"white-space: pre-wrap;\\">GatED </em></i><span style=\\"white-space: pre-wrap;\\">uses </span><b><strong style=\\"white-space: pre-wrap;\\">six sided dice </strong></b><span style=\\"white-space: pre-wrap;\\">because they’re cool and nice. In general, a roll will have a Target Number of successes (TN), most commonly 1, and may often include bonuses for additional successes. Even successful actions may come with hazards or downsides.</span></p><p><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">If a rule ever references “your TN”, it’s equal to the rating of the Skill that you’re utilizing. (Not the rating and the attribute!) There are also Dice Conditions that can apply to your rolls, both positively and negatively. More on those later.&nbsp;&nbsp;&nbsp;</span></p><p><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">Attributes and skills are the representation of character more than just action. They’re perception, contemplations, and abilities. They’re the fundamental driver of character action and development.&nbsp;</span></p><p><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><b><strong style=\\"white-space: pre-wrap;\\">Injuries </strong></b><span style=\\"white-space: pre-wrap;\\">are severe and </span><b><strong style=\\"white-space: pre-wrap;\\">death </strong></b><span style=\\"white-space: pre-wrap;\\">is inevitable. Gangers live fast and die young, leaving behind their stories and a wake of violence.</span></p>", "nodes": {"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"tag": "h1", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Mechanics", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "In ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "GatED", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"mode": "normal", "text": ", ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "characters possess four attributes, and each attribute possesses four skills. Each roll made by any character will be in the form of Attribute Dice + Skill Dice. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "GatED ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"mode": "normal", "text": "uses ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "six sided dice ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "because they’re cool and nice. In general, a roll will have a Target Number of successes (TN), most commonly 1, and may often include bonuses for additional successes. Even successful actions may come with hazards or downsides.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "If a rule ever references “your TN”, it’s equal to the rating of the Skill that you’re utilizing. (Not the rating and the attribute!) There are also Dice Conditions that can apply to your rolls, both positively and negatively. More on those later.   ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "Attributes and skills are the representation of character more than just action. They’re perception, contemplations, and abilities. They’re the fundamental driver of character action and development. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "Injuries ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "are severe and ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "death ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "is inevitable. Gangers live fast and die young, leaving behind their stories and a wake of violence.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr"}}}
34	progression	8	3	{"html": "<h1 dir=\\"ltr\\" style=\\"text-align: center;\\"><b><strong style=\\"white-space: pre-wrap;\\">Experience and Progression</strong></b></h1><p><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">In </span><i><em style=\\"white-space: pre-wrap;\\">GatED</em></i><span style=\\"white-space: pre-wrap;\\">, Characters have a variety of XP conditions they can fulfill. Each time a character fulfills one of these conditions, the gang gets a Node. Collect enough of these nodes and the gang can cash them in for an Upgrade (with GM approval). Players must progress in order of upgrades, with the cost of each upgrade increasing. A new character is created at the gang’s current Upgrade level, with all the fixin’s that entails. Generally, any particular XP condition can only be completed </span><b><strong style=\\"white-space: pre-wrap;\\">once per session </strong></b><span style=\\"white-space: pre-wrap;\\">(for the whole group), but that’s always up to GM prerogative. Note that gang is a loose term: it can be applied to police stations, weaponized labor unions, private security groups, and more. Generally, “gang” based XP conditions could just as easily say “group”. Gang archetypes and your GM may offer you additional or unique XP conditions. GMs can also offer Nodes whenever they’d like!</span></p><p dir=\\"ltr\\"><br></p><h3 dir=\\"ltr\\" style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">General XP Conditions</span></h3><p dir=\\"ltr\\"><br></p><table class=\\"editor-table\\"><colgroup><col><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Ending a session with more Profit Margins.&nbsp;</em></i></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Eliminating a rival gang.</em></i></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Save or make 30% or more on a Deal.&nbsp;</em></i></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Start a war with a gang.&nbsp;</em></i></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Critically fail a roll.&nbsp;</em></i></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Fail due to Dooming.</em></i></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Become wounded.</em></i></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Become deranged.</em></i></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Receive a permanent injury.&nbsp;</em></i></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Receive a permanent insanity.&nbsp;</em></i></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Pursue an encounter with the Paranormal.</em></i></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Each player scored a takedown (0 Health).</em></i></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Entertainment puts you into a bad situation.&nbsp;</em></i></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Perform Treatment on someone with 3 or less Health.</em></i></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Increase your reputation level.&nbsp;</em></i></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Talk your way out of getting shot.&nbsp;</em></i></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Resolve a conflict peacefully.</em></i></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Investigate significant information.</em></i></p></td></tr></tbody></table><p><br></p><h3 dir=\\"ltr\\" style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">Level Up Rewards</span></h3><p dir=\\"ltr\\" style=\\"text-align: center;\\"><br></p><table class=\\"editor-table\\"><colgroup><col><col><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">Node Cost</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">Level Rewards</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">Upgrade Level</span></p></td></tr></tbody></table><table class=\\"editor-table\\"><colgroup><col><col><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">10</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">Skill Point</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">2</span></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">10</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">Perk Point</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">3</span></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">10</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">Skill Point and General Perk</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">4</span></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">15</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">Skill Point and Perk Point</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">5</span></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">15</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">Skill Point</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">6</span></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">15</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">Perk Point</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">7</span></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">20</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">Skill Point</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">8</span></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">20</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">Perk Point</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">9</span></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">20</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">Perk Point</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">10</span></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">25</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">Skill Point</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">11</span></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">25</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">Perk Point</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">12</span></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">25</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">Perk Point</span></p></td><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p style=\\"text-align: center;\\"><span style=\\"white-space: pre-wrap;\\">13</span></p></td></tr></tbody></table><p><br></p><table class=\\"editor-table\\"><colgroup><col></colgroup><tbody><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Characters can also be awarded Nodes for the following “First —” trophies. A character can only get a first once per life of course.&nbsp;</em></i></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><u><b><strong class=\\"editor-underline\\" style=\\"white-space: pre-wrap;\\">First Kill&nbsp;</strong></b></u></p><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Confident -&gt; Wounded -&gt; Dead. Congrats pro; once worked with a merc who said he drank the blood of his first kill.&nbsp;</em></i></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><u><b><strong class=\\"editor-underline\\" style=\\"white-space: pre-wrap;\\">First Deal</strong></b></u></p><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">I hope it was more than just haggling for a T-Shirt. If you’re gonna score First Deal, best do it in style.&nbsp;</em></i></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><u><b><strong class=\\"editor-underline\\" style=\\"white-space: pre-wrap;\\">First Steal</strong></b></u></p><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">A perfectly executed multimember heist? Probably not. I just hope you didn’t get this for the protein bar in your pocket.&nbsp;</em></i></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><u><b><strong class=\\"editor-underline\\" style=\\"white-space: pre-wrap;\\">First Leap of Faith</strong></b></u></p><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Jump when the consequences are instant Permanent Injury or worse. And then Push It.&nbsp;</em></i></p></td></tr><tr><td class=\\"editor-table-cell\\" style=\\"border: 1px solid black; width: 75px; vertical-align: top; text-align: start;\\"><p dir=\\"ltr\\" style=\\"text-align: center;\\"><u><b><strong class=\\"editor-underline\\" style=\\"white-space: pre-wrap;\\">First Counterplot</strong></b></u></p><p dir=\\"ltr\\"><i><em style=\\"white-space: pre-wrap;\\">Look at you; folks got their eyes on you now. Working out counter strategies and studying your weaknesses. Better stay sharp.&nbsp;</em></i></p></td></tr></tbody></table>", "nodes": {"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"tag": "h1", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Experience and Progression", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "In ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "GatED", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"mode": "normal", "text": ", Characters have a variety of XP conditions they can fulfill. Each time a character fulfills one of these conditions, the gang gets a Node. Collect enough of these nodes and the gang can cash them in for an Upgrade (with GM approval). Players must progress in order of upgrades, with the cost of each upgrade increasing. A new character is created at the gang’s current Upgrade level, with all the fixin’s that entails. Generally, any particular XP condition can only be completed ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "once per session ", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "(for the whole group), but that’s always up to GM prerogative. Note that gang is a loose term: it can be applied to police stations, weaponized labor unions, private security groups, and more. Generally, “gang” based XP conditions could just as easily say “group”. Gang archetypes and your GM may offer you additional or unique XP conditions. GMs can also offer Nodes whenever they’d like!", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "General XP Conditions", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Ending a session with more Profit Margins. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Eliminating a rival gang.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Save or make 30% or more on a Deal. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Start a war with a gang. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Critically fail a roll. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Fail due to Dooming.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Become wounded.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Become deranged.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Receive a permanent injury. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Receive a permanent insanity. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Pursue an encounter with the Paranormal.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Each player scored a takedown (0 Health).", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Entertainment puts you into a bad situation. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Perform Treatment on someone with 3 or less Health.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Increase your reputation level. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Talk your way out of getting shot. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Resolve a conflict peacefully.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Investigate significant information.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Level Up Rewards", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 2}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Node Cost", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Level Rewards", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Upgrade Level", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}], "direction": "ltr"}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "10", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Skill Point", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "2", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}], "direction": null}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "10", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Perk Point", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "3", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}], "direction": null}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "10", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Skill Point and General Perk", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "4", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}], "direction": null}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "15", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Skill Point and Perk Point", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "5", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}], "direction": null}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "15", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Skill Point", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "6", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}], "direction": null}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "15", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Perk Point", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "7", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}], "direction": null}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "20", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Skill Point", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "8", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}], "direction": null}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "20", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Perk Point", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "9", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}], "direction": null}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "20", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Perk Point", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "10", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}], "direction": null}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "25", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Skill Point", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "11", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}], "direction": null}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "25", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Perk Point", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "12", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}], "direction": null}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "25", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Perk Point", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}, {"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "13", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "headerState": 0, "backgroundColor": null}], "direction": null}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "table", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Characters can also be awarded Nodes for the following “First —” trophies. A character can only get a first once per life of course. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "First Kill ", "type": "text", "style": "", "detail": 0, "format": 9, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Confident -> Wounded -> Dead. Congrats pro; once worked with a merc who said he drank the blood of his first kill. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "First Deal", "type": "text", "style": "", "detail": 0, "format": 9, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "I hope it was more than just haggling for a T-Shirt. If you’re gonna score First Deal, best do it in style. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "First Steal", "type": "text", "style": "", "detail": 0, "format": 9, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "A perfectly executed multimember heist? Probably not. I just hope you didn’t get this for the protein bar in your pocket. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "First Leap of Faith", "type": "text", "style": "", "detail": 0, "format": 9, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Jump when the consequences are instant Permanent Injury or worse. And then Push It. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}, {"type": "tablerow", "format": "", "indent": 0, "version": 1, "children": [{"type": "tablecell", "format": "", "indent": 0, "colSpan": 1, "rowSpan": 1, "version": 1, "children": [{"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "First Counterplot", "type": "text", "style": "", "detail": 0, "format": 9, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Look at you; folks got their eyes on you now. Working out counter strategies and studying your weaknesses. Better stay sharp. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "headerState": 0, "backgroundColor": null}], "direction": "ltr"}], "direction": "ltr"}], "direction": "ltr"}}}
27	introduction	1	1	{"html": "<h1 dir=\\"ltr\\" style=\\"text-align: center;\\"><b><strong style=\\"white-space: pre-wrap;\\">Glam and the</strong></b></h1><h1 dir=\\"ltr\\" style=\\"text-align: center;\\"><i><em style=\\"white-space: pre-wrap;\\">Electric Death</em></i></h1><p dir=\\"ltr\\"><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">A narratively driven rpg following the lives and </span><b><strong style=\\"white-space: pre-wrap;\\">eventual deaths</strong></b><span style=\\"white-space: pre-wrap;\\"> of mystical cybernetically augmented gangsters. On the world of Nova Viridian, in an age of interstellar blackout, humans find themselves waking up from the cryosleep of their harbingerous Coffin Ships. The automated piloting system has landed them on a nearly arid world, and their environmental terraforming systems have already begun to convert this dusty world into a paradise like the home they were forced to abandon.</span></p><p dir=\\"ltr\\"><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">Things begin but do not proceed smoothly. Amongst the early colonies, strange technical mishaps began occurring. Small-scale, fixable – at first. Drones flying in aimless circles in the desert until they overheat and crashland. Food Dispensers failing to cook their food or serve the right item. Sleep pods over or understimulating their users, resulting in insomnia and comas alike. No one had connected these issues for a long, long time. Only once the dreams began in earnest did anyone grow suspicious of a singular cause.</span></p><p dir=\\"ltr\\"><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">Someone went down there, into the strangely neat square tunnels that diced and sliced the underside of Nova Viridian. No one knows who, but someone went down there and sparked this whole powder keg. They made contact with the Sleeping Giants, the strange vaguely sapient statues perfectly molded into the earth below, as though they had been present when the planet formed and its only choice was to mold around the foreign bodies. But once contact was made, the human psyche was opened, and the gestalt changed forever.</span></p><p dir=\\"ltr\\"><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">Dreams guided men in those days – to do great things, vile things, tremendous things, evil things. Dreams made men turn on their leaders in fiery, bloody rebellion. Dreams made men rip apart their data archives and kill their scholars. Dreams made men shred their terraformers to pieces when the badlands had not yet burgeoned and only shrubs and small reptiles could match the harsh conditions of the arid world. Dreams scattered men to the corners of the world where they built their neon pyramids and descended to live in their manufactured heights. For decades they built, for centuries they repopulated, and finally the human ecosystem began to reform its predator and prey cycle.</span></p><p dir=\\"ltr\\"><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">Along the pyramid walls, shanty towns and blackmarkets are battered by dust and radstorms. Inside the city, violence reigns supreme. Cybernetic gangsters meet in open battle on the streets, armed with rudimentary custom firearms and melee objects of varying original intent. The strongest of these gangs rise above the crop to battle whatever force reigns supreme in their local pond. The Federals, Noblebloods, Corporate Holdouts, and the Church remain in power centuries after their formation, due in part to the scattering of humanity centuries ago. They all possess their own private armies of heavily augmented agents, and will easily stamp out most petty gangs.</span></p><p dir=\\"ltr\\"><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">Amidst it all, spiritualism and esoteric mysticism pervades each city to its heart. Oracles, exorcists, dreamers, and more all claim to see beyond the material veil to a world where Sleeping Giants and ghosts of the past converge and interfere with the material world. They inscribe cybernetic limbs with esoteric power, and channel the subconscious dreamer to interact with the gestalt psyche of mankind.</span></p>", "nodes": {"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"tag": "h1", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Glam and the", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr", "textFormat": 1}, {"tag": "h1", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Electric Death", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textFormat": 2}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "A narratively driven rpg following the lives and ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "eventual deaths", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": " of mystical cybernetically augmented gangsters. On the world of Nova Viridian, in an age of interstellar blackout, humans find themselves waking up from the cryosleep of their harbingerous Coffin Ships. The automated piloting system has landed them on a nearly arid world, and their environmental terraforming systems have already begun to convert this dusty world into a paradise like the home they were forced to abandon.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "Things begin but do not proceed smoothly. Amongst the early colonies, strange technical mishaps began occurring. Small-scale, fixable – at first. Drones flying in aimless circles in the desert until they overheat and crashland. Food Dispensers failing to cook their food or serve the right item. Sleep pods over or understimulating their users, resulting in insomnia and comas alike. No one had connected these issues for a long, long time. Only once the dreams began in earnest did anyone grow suspicious of a singular cause.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "Someone went down there, into the strangely neat square tunnels that diced and sliced the underside of Nova Viridian. No one knows who, but someone went down there and sparked this whole powder keg. They made contact with the Sleeping Giants, the strange vaguely sapient statues perfectly molded into the earth below, as though they had been present when the planet formed and its only choice was to mold around the foreign bodies. But once contact was made, the human psyche was opened, and the gestalt changed forever.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "Dreams guided men in those days – to do great things, vile things, tremendous things, evil things. Dreams made men turn on their leaders in fiery, bloody rebellion. Dreams made men rip apart their data archives and kill their scholars. Dreams made men shred their terraformers to pieces when the badlands had not yet burgeoned and only shrubs and small reptiles could match the harsh conditions of the arid world. Dreams scattered men to the corners of the world where they built their neon pyramids and descended to live in their manufactured heights. For decades they built, for centuries they repopulated, and finally the human ecosystem began to reform its predator and prey cycle.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "Along the pyramid walls, shanty towns and blackmarkets are battered by dust and radstorms. Inside the city, violence reigns supreme. Cybernetic gangsters meet in open battle on the streets, armed with rudimentary custom firearms and melee objects of varying original intent. The strongest of these gangs rise above the crop to battle whatever force reigns supreme in their local pond. The Federals, Noblebloods, Corporate Holdouts, and the Church remain in power centuries after their formation, due in part to the scattering of humanity centuries ago. They all possess their own private armies of heavily augmented agents, and will easily stamp out most petty gangs.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "Amidst it all, spiritualism and esoteric mysticism pervades each city to its heart. Oracles, exorcists, dreamers, and more all claim to see beyond the material veil to a world where Sleeping Giants and ghosts of the past converge and interfere with the material world. They inscribe cybernetic limbs with esoteric power, and channel the subconscious dreamer to interact with the gestalt psyche of mankind.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "textFormat": 2}}}
\.


--
-- Data for Name: BookSection; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."BookSection" (id, "order", title) FROM stdin;
1	1	introduction
2	2	attributes and skills
3	3	mechanics
\.


--
-- Data for Name: Character; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Character" (id, "userId", level, profits, stats, picture, height, weight, age, sex, background, attributes, "firstName", "lastName", active) FROM stdin;
4	2	4	470	{"injuries": 5, "insanities": 1, "currentHealth": 13, "currentSanity": 4}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736209065/gated/jziqhbkbpiqpl58esupt.jpg", "publicId": "gated/jziqhbkbpiqpl58esupt"}	72	180	30	Male	I was born and raised in one of the lowest sectors of the city, and in addition to that, my upbringing wasn’t exactly what you would call happy or comfortable. I was born with a nervous system gone haywire, and if not addressed soon after my birth, I would have gone braindead in a matter of days. This kind of problem could only be fixed with chrome.\n\nBeing from one of the lowest sectors in the city, my parents were barely scraping by to survive. Affording chrome was out of the question. My father, now searching desperately for a way to save my quickly decaying body, came into contact with a wealthy man high in the power hierarchy of the corporate holdouts during his search. The details of why are unclear to me, but through this interaction an agreement was struck. My parents were to devote their lives to this man in servitude and slavery, lending themselves to any work or whim he desired and in exchange he would fund the necessary chrome that would save my life.\n\nMy parents delivered by small body along with the chrome to the doorstep of my sector's local ripperdoc before being ripped away from me and shipped off to only the sleeping giants know where. Upon the discovery of my body, the ripperdoc hurriedly installed my newly acquired chrome out of what I can only assume would be either pity or the morbid curiosity to see a cybernetically enhanced baby. Either way my life was saved. The power requirements of the installed chrome were enough to sap my body of its excess neural activity, restoring my brain to normal functioning activity.\n\nEver since that day, the ripperdoc has not exactly been caring for me, but lending me a hand when necessary and updating my chrome to fit my body as I age. I assume I keep his interest as his ongoing cybernetic experiment. None the less, he has never done me wrong and I can only be thankful for his part in my existence.\n\nAt a young age, with no one providing for my everyday needs, I had to learn the skills necessary for survival in the city. With no money and nothing to my name, my only option for survival was through crime. Myself and some other misfits throughout my sector would routinely conduct small scale heists, pilfering survival supplies and maybe a little extra money along the way. Given my negative disposition to the corpos, we aimed our efforts at sapping whatever we could manage from their pockets.\n	{"peace": {"points": 1, "skills": {}}, "violence": {"points": 2, "skills": {"shooting": {"points": 2}, "threshold": {"points": 3}}}, "cybernetica": {"points": 3, "skills": {"motorized": {"points": 1}, "networked": {"points": 2}, "chromebits": {"points": 4}}}}	Uni	Dori	t
5	6	6	6900	{"injuries": 3, "insanities": 2, "currentHealth": 16, "currentSanity": 5}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736315277/gated/tq9nqvofpssxt15zbq7g.png", "publicId": "gated/tq9nqvofpssxt15zbq7g"}	76	220	35	Male	Drugs, sex, and murder. It's Zombie King Fenton. 	{"violence": {"points": 4, "skills": {"assault": {"points": 4}, "shooting": {"points": 3}, "threshold": {"points": 3}}}, "cybernetica": {"points": 2, "skills": {"chromebits": {"points": 2}}}}	Fenton	The Elephenton	f
6	6	1	10	{"injuries": 0, "insanities": 0, "currentHealth": 18, "currentSanity": 5}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736321604/gated/zfbxms2gratq5aosideu.jpg", "publicId": "gated/zfbxms2gratq5aosideu"}	69	169	69	Male	I need that 69 four arms	{"peace": {"points": 2, "skills": {"barter": {"points": 4}, "treatment": {"points": 2}}}, "violence": {"points": 3, "skills": {"shooting": {"points": 3}, "threshold": {"points": 4}}}, "esoterica": {"points": 1, "skills": {"godhead": {"points": 2}}}, "cybernetica": {"points": 4, "skills": {"hardwired": {"points": 2}, "networked": {"points": 4}, "chromebits": {"points": 4}}}}	69	Man	f
13	11	7	10	{"injuries": 0, "insanities": 0, "currentHealth": 18, "currentSanity": 5}	{}	69	200	40	Male	He's mad, simply mad	{"peace": {"points": 1, "skills": {}}, "violence": {"points": 1, "skills": {"threshold": {"points": 4}}}, "esoterica": {"points": 2, "skills": {"godhead": {"points": 4}}}, "cybernetica": {"points": 2, "skills": {"hardwired": {"points": 1}, "networked": {"points": 1}}}}	Francois	Venici	f
9	7	7	34	{"injuries": 0, "insanities": 0, "currentHealth": 10, "currentSanity": 4}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736403148/gated/hqtnlhvxbmq6wu348b6p.png", "publicId": "gated/hqtnlhvxbmq6wu348b6p"}	70	160	30	Male	A Noble aligned ex-intelligence officer. His former team, "Little Hand" were a black-ops specialty task force. They were tragically ambushed by a Federally aligned group lead by one Lt. Fiasco. He is the last the team, and survival is crucial. \n\nVengeance is hard, letting go is harder.	{"peace": {"points": 2, "skills": {"erudition": {"points": 2}}}, "violence": {"points": 4, "skills": {"assault": {"points": 2}, "subterfuge": {"points": 4}}}, "cybernetica": {"points": 0, "skills": {"networked": {"points": 4}, "chromebits": {"points": 1}}}}	Rev		f
11	6	1	10	{"injuries": 0, "insanities": 0, "currentHealth": 14, "currentSanity": 11}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736497148/gated/fzmxihfuc586nmnhlg1d.jpg", "publicId": "gated/fzmxihfuc586nmnhlg1d"}	68	190	51	Male	A former priest who now tends to his flock independently. He has earned the ire of both Corpos and Church Officials, and has become a drunken cantankerous borderline extremist. 	{"peace": {"points": 1, "skills": {"rhetoric": {"points": 1}}}, "violence": {"points": 3, "skills": {"assault": {"points": 2}, "shooting": {"points": 2}, "threshold": {"points": 2}}}, "esoterica": {"points": 2, "skills": {"mysticism": {"points": 3}}}}	Father	Mclain	f
8	8	7	10	{"injuries": 0, "insanities": 0, "currentHealth": 10, "currentSanity": 5}	{}	62	95	30	Female	A victim of the recent Godhead breach who was brought into the Somnality for an unknown period of time. Here she found devotion to the Godhead and believes that humanity's time has come to the end. 	{"esoterica": {"points": 3, "skills": {"gestalt": {"points": 3}, "godhead": {"points": 2}}}, "cybernetica": {"points": 3, "skills": {"networked": {"points": 4}, "chromebits": {"points": 4}}}}	Hisoki	Deshi	f
14	9	1	10	{"injuries": 0, "insanities": 0, "currentHealth": 10, "currentSanity": 11}	{}	70	150	50	Male	Monticello Rossi was born wildly attuned to the esoteric world. Unable to distinguish the realities before him, his parents turned to ZoeCorp, an asylum that experiments on its patients. For many years, Monticello was drugged into compliance, going into a coma. While in his coma, Monticello stabilized his	{"peace": {"points": 2, "skills": {"rhetoric": {"points": 2}}}, "violence": {"points": 0, "skills": {"subterfuge": {"points": 2}}}, "esoterica": {"points": 4, "skills": {"gestalt": {"points": 1}, "godhead": {"points": 1}, "mysticism": {"points": 3}, "outerworld": {"points": 1}}}}	Monticello	Rossi	f
12	10	4	1	{"injuries": 2, "insanities": 0, "currentHealth": 18, "currentSanity": 7}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736497482/gated/mflriojgmoatcxhuzj5x.png", "publicId": "gated/mflriojgmoatcxhuzj5x"}	78	240	30	Male	ggg	{"peace": {"points": 1, "skills": {"rhetoric": {"points": 1}}}, "violence": {"points": 3, "skills": {"assault": {"points": 3}, "threshold": {"points": 4}}}, "esoterica": {"points": 0, "skills": {"mysticism": {"points": 1}, "outerworld": {"points": 1}}}, "cybernetica": {"points": 2, "skills": {"chromebits": {"points": 4}}}}	Jax	Crimson	f
21	8	7	3	{"injuries": 0, "insanities": 0, "currentHealth": 14, "currentSanity": 7}	{}	70	140	28	Male	Bio	{"peace": {"points": 0, "skills": {"erudition": {"points": 1}}}, "violence": {"points": 0, "skills": {"threshold": {"points": 2}}}, "esoterica": {"points": 3, "skills": {"godhead": {"points": 2}, "mysticism": {"points": 1}}}, "cybernetica": {"points": 3, "skills": {"networked": {"points": 4}, "chromebits": {"points": 4}}}}	Lucas "Lucid"	Ashford	t
18	12	4	-32	{"injuries": 2, "insanities": 0, "currentHealth": 16, "currentSanity": 4}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738453718/gated/kcflpgjxzmhdiahd6vr4.jpg", "publicId": "gated/kcflpgjxzmhdiahd6vr4"}	71	175	30	Male	Smoke Grenade\nSCX Eyes\nThroat Mod\n\nDaytona corp - lost control cause of Coltov\n\nLetlin Limited - company owning chop shop warehouse. \n\n\n\n	{"peace": {"points": 3, "skills": {"barter": {"points": 4}}}, "violence": {"points": 0, "skills": {"threshold": {"points": 3}}}, "esoterica": {"points": 3, "skills": {"godhead": {"points": 4}}}, "cybernetica": {"points": 0, "skills": {"chromebits": {"points": 1}}}}	Monty	Gay	f
16	8	7	10	{"injuries": 0, "insanities": 0, "currentHealth": 10, "currentSanity": 5}	{}	71	165	33	Male	;dag;dsklfn	{"esoterica": {"points": 3, "skills": {"gestalt": {"points": 4}, "mysticism": {"points": 2}}}, "cybernetica": {"points": 3, "skills": {"networked": {"points": 4}, "chromebits": {"points": 4}}}}	Melos "Melter"	Son	f
22	3	1	6	{"injuries": 0, "insanities": 0, "currentHealth": 16, "currentSanity": 5}	{}	23	23	23	Male	asdf	{"violence": {"points": 3, "skills": {"threshold": {"points": 4}}}, "esoterica": {"points": 3, "skills": {"gestalt": {"points": 4}, "godhead": {"points": 2}}}}	asdf	asdf	t
15	7	7	0	{"injuries": 0, "insanities": 0, "currentHealth": 16, "currentSanity": 7}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739212689/gated/ovcm6pwthrbgwuu15ewk.jpg", "publicId": "gated/ovcm6pwthrbgwuu15ewk"}	73	200	37	Male	A respected cop of New Thabacary, he departed the force after the loss of his daughter in a violent gang war in RC-13 a year ago. Those who worked with him say that his stoic demeanor became even colder, even more calloused when he was told by his superiors that it was "outside of his jurisdiction".\n\nAfter mourning her loss, he began to hear the voices... they say it wasn't a gang war at all.\n\n\nSubtle mod (+1 Sanity, +1 Cyber)	{"violence": {"points": 1, "skills": {"assault": {"points": 1}, "threshold": {"points": 4}}}, "esoterica": {"points": 4, "skills": {"mysticism": {"points": 2}, "outerworld": {"points": 4}}}, "cybernetica": {"points": 1, "skills": {"chromebits": {"points": 3}}}}	Robert "Creed"	Shaw	t
\.


--
-- Data for Name: CharacterCart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CharacterCart" (id, "characterId") FROM stdin;
1	9
2	6
3	5
4	15
5	13
6	14
7	4
8	8
9	11
10	12
11	16
12	18
13	21
14	22
\.


--
-- Data for Name: CharacterCondition; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CharacterCondition" (id, stacks, "conditionId", "characterId") FROM stdin;
\.


--
-- Data for Name: CharacterInventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CharacterInventory" (id, "characterId") FROM stdin;
1	9
2	5
3	6
4	13
5	8
6	4
7	11
8	14
9	15
10	12
11	16
12	18
13	21
14	22
\.


--
-- Data for Name: Condition; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Condition" (id, name, "conditionType", description) FROM stdin;
1	Berserk	character	Treat all characters as enemies, and attack the nearest enemy on your turn.
2	Bleed	character	At the beginning of your turn, make an Endure roll with a TN equal to the number of stacks of Bleed. On failure, you lose (X / 2) Health, rounding up, where X is the number of stacks of Bleed.
3	Blind	character	You cannot see. Rolls requiring Vision (attacks, driving, gauging distance) are Unlucky and Dooming. Attacks against Blind characters are Booming and Lucky.
4	Breaking	character	Every time you roll, you lose 1 sanity.
5	Burning	character	Affected characters lose (X / 2) Health and Sanity, rounding up, at the end of their turn. Then reduce the number of stacks by the same amount.
6	Cover	character	Raise your Evasion by 2. Raise your Armor against Blast or Spray attacks by 2. Cover is directional; it must be in between you and the attack.
7	Charmed	character	You cannot bring yourself to harm another character. You cannot attack or interpose on characters Charming you.
8	Confusion	character	You perform your most common method of attack (be honest) against a random target.
9	Crumbling	character	At the end of your turn, you lose 1 Sanity. Then, remove a stack of Crumbling. If your stacks of Crumbling exceed your Godhead Rating, lose 2 sanity instead.
10	Damaged	item	Rolls with damaged objects receive Dooming.
11	Deafened	character	You cannot hear. Rolls requiring Hearing (awareness, eavesdropping, tracking) are Unlucky and Dooming. Attacks from behind Deaf Characters are Booming.
12	Disarmed	character	Attack rolls receive Dooming.
13	Exhausted	character	Reduce your Equip and Speed by X where X is the number of stacks of Exhausted.
14	Feared	character	When targeting another character, your rolls are Dooming (this includes benefits targeting allies).
15	Grabbed	character	Speed is reduced to 0 while grabbed. Contest Assault or Threshold for 1 action (repeatable) to break free of Grabs.
16	Inept	character	Do not add Attribute Dice to rolls.
17	Poisoned	character	At the beginning of your turn, make an Endure roll with a TN equal to the number of stacks of poisoned. On failure, your rolls this turn get dooming.
18	Prone	character	Raise your evasion by 1. Raise your Armor against Blast or Spray damage by 1. Your speed is set to 1 while prone. Melee attacks against you are Booming and ignore the extra evasion. Heavy weapons are automatically braced.
19	Rattled	character	You receive -1 reaction this round (or turn if you’re AWOL).
20	Sealed	character	A sealed creature is trapped within an object. A creature’s rating contests the object's rating based on the item rating.
21	Shocked	character	At the start of your turn, you take 1 damage. Then, the nearest ally within 3 tiles (15 feet) of you takes 1 damage. This repeats X times, from each target struck. Each turn, reduce the number of stacks by 1.
22	Slowed	character	You lose X speed.
23	Stabilized	character	You remove X conditions negatively affecting your attack while Stabilized.
24	Stunned	character	You lose X actions from your next turn. If X is greater than 3, lose actions from subsequent turns.
25	Vulnerable	character	Attacks deal X more damage to you.
26	Cursed	item	This item is cursed. Curses vary in form and function, but are almost always dreadful. Ask your GM for more information about this curse! Or use it regardless...
\.


--
-- Data for Name: Cybernetic; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cybernetic" (id, name, "cyberneticType", stats, picture, description, body, price, keywords, "characterInventoryId", equipped, "baseCyberneticId", grade, rarity) FROM stdin;
19	S+ Voice Modulator	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736382253/gated/ecapvhnyqz2ypicp9awq.jpg", "publicId": "gated/ecapvhnyqz2ypicp9awq"}	Allows for manual or automatic adjustments to subconscious voice qualities. Add 1 dice to Charm Rolls.	{Throat}	9	{}	\N	f	\N	1	common
14	El Sandorino	function	{"cyber": 5, "power": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735972159/gated/iye8rjrwzfwqbior9nhl.jpg", "publicId": "gated/iye8rjrwzfwqbior9nhl"}	When you see a man moving faster than possible, with bloodshot eyes and hemorrhages coming out of his nose and ears, trust that it’s a Sandorino. Pump the nervous system so fulla juice it could burst; but if it doesn’t, the user gets to move, see, and think faster than they ever have before.	{Brain,Spine}	25	{}	\N	f	\N	1	blackMarket
10	Kenjio Mk. 1	offensive	{"cyber": 2}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739386689/gated/xihmhi4hiquph7c4ijjh.jpg", "publicId": "gated/xihmhi4hiquph7c4ijjh"}	A subdermal compartment conceals a hidden blade. You can attack with the blade mounted in your forearm without using your hand; this attack may roll Cybernetica: Chromebits.	{Arm}	13	{}	\N	f	\N	1	uncommon
15	Vipermonkey Tail	function	{"cyber": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736237968/gated/li7ukhacthei4uva32wf.jpg", "publicId": "gated/li7ukhacthei4uva32wf"}	This strange device looks like a cross of a crane hand and a medical syringe on a bioimitative articulated tentacle. It grants you +10 feet of reach (+2 tiles) when you want to grab something, make a melee attack with it, or perform First Aid, and can support your whole body weight. It counts as an additional arm for all purposes. Using it to swing grants you the ability to jump (5 x Chromebits) feet with it. If the terrain is appropriate, this can be performed in the middle of a normal jump without requiring another action. The first action you perform with it each turn is free.	{Coccyx}	\N	{"{\\"keywordId\\": 25}"}	\N	f	\N	1	artifact
16	Lu Diplomet	offensive	{"cyber": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739388255/gated/dpzpe2ppoto0rmu9rpou.jpg", "publicId": "gated/dpzpe2ppoto0rmu9rpou"}	A convertible automatic weapon that works and functions like a normal prosthetic. Noble Court Lords and Ladies often utilized bound retainers, men and women who have committed their lives and bodies to the Ad Nobilitatem. These prosthetics ensure that even in political courts where weapons are not allowed, the lord in question maintains firepower superiority. This weapon changes forms as a free action.	{Arm}	17	{}	\N	f	\N	1	uncommon
12	Mazer Beam Cannon	offensive	{"cyber": 4, "power": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735965244/gated/twskj0rcgtgwrvmabwug.jpg", "publicId": "gated/twskj0rcgtgwrvmabwug"}	An energy weapon that laughs in the face of industry bottlenecks. Neutrino Mass Limitations? Ion Field Collapse? Electromagnetic Dispersion? Ha. This energy cannon functions like a normal hand until you choose to use it as a weapon. It can also change back for free. You can spend one or more actions to charge and shoot it. You may roll Cybernetica: Chromebits to shoot.	{Arm}	\N	{"{\\"keywordId\\": 25}"}	\N	f	\N	1	artifact
11	T-90 Electro-Knuckles	offensive	{"cyber": 2, "power": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735933456/gated/b2pd4zpvib5nnkdshcxx.jpg", "publicId": "gated/b2pd4zpvib5nnkdshcxx"}	Conducting plates and rods through the hands, plus insulating materials, power dynamos… The punch only a genius could create. \nYou may use Cybernetica: Chromebits instead of Violence: Assault to roll for Unarmed Attacks and the Mastery keyword effect. When performing an Unarmed Attack, use the weapon profile below.	{Hands}	15	{}	\N	f	\N	1	uncommon
8	Kessl E-Med System	defensive	{"cyber": 2, "power": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735965959/gated/r4e6dnzq4lwmhaz646wa.jpg", "publicId": "gated/r4e6dnzq4lwmhaz646wa"}	An adrenal pump plus neuro stimulant jack. Cognitive reaction enhancement and neuromuscular reflex activation.	{Spine}	14	{}	\N	f	\N	1	uncommon
21	CR87 Cyber Deck	function	{"cyber": 2}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738738015/gated/c0uzjecoef5dwchtogbo.jpg", "publicId": "gated/c0uzjecoef5dwchtogbo"}	The Caldwin CR87 is a cerebral and spinal augment that acts as a miniature Sphere Hub once deployed.	{Brain}	15	{}	\N	f	\N	1	uncommon
7	Fire Retardant Skin	defensive	{"cyber": 2, "power": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735966242/gated/ot09jq4j3wpi3awbynrk.jpg", "publicId": "gated/ot09jq4j3wpi3awbynrk"}	Nonreactive thermoablative foam secretes, hardens, and sloughs off seconds later. For when you want to set the world on fire and watch it burn.	{Skin}	13	{}	\N	f	\N	1	uncommon
17	Cuatsio Attachment	function	{"cyber": 5}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738981744/gated/vbfumcw42xv2rcothymo.jpg", "publicId": "gated/vbfumcw42xv2rcothymo"}	A prosthetic replacement that could only be considered an upgrade. Your character now has 4 arms. Your unarmed attacks can roll Chromebits, and may use them for Mastery instead of assault. Add +1 to your melee Flurry Rating. Checks of upper body strength and arm use in general may now roll Chromebits. Heavy weapons can be braced while standing if held by at least 3 arms. Heavy Weapons are braced if held by 4 arms. These arms can be other Cybernetics in addition to this replacement.	{Arms,Spine}	20	{}	\N	f	\N	1	blackMarket
43	Koshenji Ako 4’s	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738986771/gated/kt56ccoevzayvavpkvpv.jpg", "publicId": "gated/kt56ccoevzayvavpkvpv"}	AI augmented recall through neural stimulation. Add 1 dice to Specific Recall and Diagnosis Rolls.	{Brain}	8	{}	\N	f	\N	1	common
38	Tesla Rager	function	{"cyber": 2, "power": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739056093/gated/l7wbevcv1expgtffdw9j.jpg", "publicId": "gated/l7wbevcv1expgtffdw9j"}	Massive coils can be deployed from the back, arcing electricity to nearby targets.	{Back}	17	{}	\N	f	\N	1	uncommon
45	M-Mordian Splicers	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738988459/gated/q5yia11pcdzsrjz4xgto.jpg", "publicId": "gated/q5yia11pcdzsrjz4xgto"}	Neural relaxants ease shakes, ticks, and shivers. Stability and control. Add 1 dice to First Aid and Surgery Rolls.	{Hands}	9	{}	\N	f	\N	1	common
34	IV Chemtanks	function	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738985412/gated/kjkvrmfqj4nvvhg3qev4.jpg", "publicId": "gated/kjkvrmfqj4nvvhg3qev4"}	This chemtank allows the user to rapidly alter dosages in their bloodstream. When you receive Chemical Therapy, you may choose 2 varieties, switching between them after 10 minutes of dialysis. If Cyber drops below the amount needed, the character must disable a cybernetic.	{Kidney}	6	{}	\N	f	\N	1	common
44	L.3 Bellower	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738987848/gated/xfjei6rf9yrh349z5eer.jpg", "publicId": "gated/xfjei6rf9yrh349z5eer"}	Standard refit for members of the Shaddaian Priesthood. Add 1 dice to Crowdwork and Distract Rolls.	{Throat}	8	{}	\N	f	\N	1	common
40	Cerebral Shielding	defensive	{"cyber": 2, "power": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738981192/gated/lfzpxadhgiyykfzafyxc.jpg", "publicId": "gated/lfzpxadhgiyykfzafyxc"}	A lining that connects to an internal computer and intercepts registered neurosignals, adapting to psychokinetic damage.	{Skull}	15	{}	\N	f	\N	1	rare
30	Shenjiro Kadamatsu’s	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739054433/gated/zv0366djmsjgmokkrj41.jpg", "publicId": "gated/zv0366djmsjgmokkrj41"}	Corroborates visual information with 3D audio to aid in attack positioning. Add 1 Dice to Sneak Attack rolls.	{Ears}	10	{}	\N	f	\N	1	common
31	Armor Grafting	stat	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738980218/gated/tmitcovkhvsxofmfcp5y.jpg", "publicId": "gated/tmitcovkhvsxofmfcp5y"}	Subdermal plating is placed throughout the body in a rather rudimentary manner compared to active armor varieties. The plates provide a more permanent but primitive solution. +1 Armor but -2 Speed.	{Skin}	9	{}	\N	f	\N	1	common
42	F-7 Series	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738983604/gated/qomgnnet9igw84yvuvwp.jpg", "publicId": "gated/qomgnnet9igw84yvuvwp"}	A shock prevention unit for Federal Ground Infantry. Add 1 dice to Endure Rolls.	{Kidney}	8	{}	\N	f	\N	1	common
26	Genshin 870	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738984309/gated/bvd8iwiuwjxnqiz1fbwt.jpg", "publicId": "gated/bvd8iwiuwjxnqiz1fbwt"}	Hyper motion sensitivity and enhanced peripheral vision aid reaction based combat. Add 1 dice to Flurry Rolls.	{Eyeballs}	11	{}	\N	f	\N	1	common
29	Koshenji Ronin 2	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738987039/gated/isw4slt07vchwkj3ngl7.jpg", "publicId": "gated/isw4slt07vchwkj3ngl7"}	Strengthening of the pinky finger and the wrist. Add 1 Dice to Single Strike rolls.	{Hands}	8	{}	\N	f	\N	1	common
51	Ukyo Security System	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739056277/gated/rlyymoo6pcrl2fker29f.jpg", "publicId": "gated/rlyymoo6pcrl2fker29f"}	Neurostimulants and chemical assistance aid in detection and investigating. Add 1 dice to Detect Rolls.	{"Ocular Nerve"}	10	{}	\N	f	\N	1	common
46	Sawanji Gen 7’s	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738994014/gated/vebrgnkfywc31k5xxodp.jpg", "publicId": "gated/vebrgnkfywc31k5xxodp"}	Originally designed for Corporate chauffeurs. Add 1 dice to Maneuver Rolls.	{Eyeballs}	8	{}	\N	f	\N	1	common
47	Shenjiro Gen 2	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739054283/gated/mzcqnl3vsg0lpiiuuei2.jpg", "publicId": "gated/mzcqnl3vsg0lpiiuuei2"}	Foot structure enhancement. Add 1 dice to Sneaking Rolls.	{Feet}	10	{}	\N	f	\N	1	common
39	Activated Insulation	defensive	{"cyber": 2, "power": 3, "currentPower": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738979867/gated/lva3oeu9na6hfap9wzxr.jpg", "publicId": "gated/lva3oeu9na6hfap9wzxr"}	Similar to subdermal plating, activated insulation lines the subcutaneous layer with a chemically reactive insulator. Once active, exterior electric shocks are neutralized.	{Skin}	11	{}	\N	f	\N	1	uncommon
53	Delaby Auto Aid	stat	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738982012/gated/b4regtafgn3uak3nxkhu.jpg", "publicId": "gated/b4regtafgn3uak3nxkhu"}	A system that distributes coagulants and painkillers to make you just that much more unkillable. Add +1 Health.	{Kidneys}	11	{}	\N	f	\N	1	common
67	Saint Krieger’s Array	offensive	{"cyber": 2, "power": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738993049/gated/iokxvsmt2o6tiwnzfxvr.jpg", "publicId": "gated/iokxvsmt2o6tiwnzfxvr"}	This less than subtle augment involves a series of adjustments to the biomechanics of the legs. The result is short bursts of ballistic power. \nYou may use Chromebits instead of Assault or Threshold for powerful fitness challenges.	{Legs}	15	{}	\N	f	\N	1	uncommon
72	Net Burners	defensive	{"cyber": 2, "power": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738988861/gated/j5td4iowva5q05fu1ej9.jpg", "publicId": "gated/j5td4iowva5q05fu1ej9"}	Distributed neural blackboxes remain inert until a Networked hacking attempt is detected. They flood the user with a DDOS type attack, hoping to burn out their neurals.	{Brain}	17	{}	\N	f	\N	1	uncommon
52	Zimnic 88	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739058345/gated/jhflssiglpnzrrli8wpl.jpg", "publicId": "gated/jhflssiglpnzrrli8wpl"}	AI assisted visual secretary. Updates numbers based on visual and auditory information. Add 1 dice to Deal and Estimation rolls.	{Eyelids}	11	{}	\N	f	\N	1	common
55	Dexin Drone Pillar	stat	{"cyber": 2}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738982564/gated/muiaosya6ekh7xyg0www.jpg", "publicId": "gated/muiaosya6ekh7xyg0www"}	Helps bear the load of neural linked hardware. The number of turrets or drones you can link with gets +1.	{Brain}	13	{}	\N	f	\N	1	uncommon
62	Dexin Doppler Array	function	{"cyber": 1, "power": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738982070/gated/ocov2wr5f651ljymg28k.jpg", "publicId": "gated/ocov2wr5f651ljymg28k"}	Ultra high frequency sound waves are emitted from the base of the ear and processed by micro-cpus upon returning. When rolling to detect concealment through auditory clues, you can roll chromebits with Booming. Information you receive from audio cues is also more precise, and can be defined in 3 dimensions of space as opposed to just direction.	{Ears}	11	{}	\N	f	\N	1	uncommon
54	Dexin Drone Extender	stat	{"cyber": 2}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738982313/gated/w4t4guf4s0ldz3eo1bm7.jpg", "publicId": "gated/w4t4guf4s0ldz3eo1bm7"}	This amplifying device is implanted beneath the upper back muscles. There, it increases the user’s Hardwire range by 2x.	{Back}	13	{}	\N	f	\N	1	common
63	Kishin Stabilizers	function	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738986604/gated/ptxuvnl3pkx7tp2okdqf.jpg", "publicId": "gated/ptxuvnl3pkx7tp2okdqf"}	This series of augments places stabilizing hooks into the heel and a short length of flexible wire that pulls taught to hold the body. While Braced, you are Stabilized 1. You can brace while standing.	{Hips,Feet}	10	{}	\N	f	\N	1	common
66	P-70 PDS	offensive	{"cyber": 2}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738989995/gated/kjmnpj3cruage3j177zx.jpg", "publicId": "gated/kjmnpj3cruage3j177zx"}	The P-70 Payload Delivery System allows the user to load directional charges into a launcher on their forearms. When performing an unarmed Haymaker, the user can detonate one of the charges, causing a grenade blast in the direction of the target, leaving the user and those next to or behind them unharmed. The munitions are labeled as Grenades and Mines in the launchers and explosives section.	{Arms}	14	{}	\N	f	\N	1	uncommon
68	SCX — Gen-6	stat	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738994775/gated/ysfifipoubhnjx9hvgur.jpg", "publicId": "gated/ysfifipoubhnjx9hvgur"}	Ocular augments with that can pinpoint minute discrepancies. \nYou may use Cybernetica Chromebits when detecting concealment. You possess infrared vision, allowing you to negate the penalties of Darkness and gaseous visual obstruction.	{Eyes}	10	{}	\N	f	\N	1	uncommon
69	SL-11 Sonic Device	offensive	{"cyber": 2, "power": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739055077/gated/kumodmjgdfwe918wjwbv.jpg", "publicId": "gated/kumodmjgdfwe918wjwbv"}	Vocal cord enhancement, in both output and control.	{Mouth}	10	{}	\N	f	\N	1	uncommon
71	Subdermal Plating	defensive	{"cyber": 2, "power": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739055779/gated/hatukglhasnb3siefvjw.jpg", "publicId": "gated/hatukglhasnb3siefvjw"}	Nanocarbon electromesh spread beneath your skin, woven into your muscles. Activate to shrug off small arms and ready a counter attack.	{Skin}	15	{}	\N	f	\N	1	uncommon
59	VUDU 909	stat	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739056429/gated/eablun0vffvnvilkyamd.jpg", "publicId": "gated/eablun0vffvnvilkyamd"}	This neural implant protects the mine from the hazards of Full Dives, primarily D-Mines. It does so by disassociating conscious action through proxy into the Dive. Cowboys say it feels like you’re puppeteering yourself.You reduce D-Mine damage by 1 (regardless of type).	{Brain}	14	{}	\N	f	\N	1	uncommon
61	XL-19 Speed Refit	stat	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739058072/gated/vrltjh3j59mhxznzbh7j.jpg", "publicId": "gated/vrltjh3j59mhxznzbh7j"}	An augment that efficiently coordinates synergistic movement. Add half your Chromebits (rounded up)  to your Speed. 	{Joints}	12	{}	\N	f	\N	1	common
33	Filter Cipher	function	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738984233/gated/ydggil3c9n23d93auf6k.jpg", "publicId": "gated/ydggil3c9n23d93auf6k"}	A rudimentary augment, which offers no defensive benefit besides buying time. When you become affected by a Wyrm or Malfunction, the effect is delayed until the end of your next turn.	{Brainstem}	8	{}	\N	f	\N	1	common
73	Coral Harmonic Array	function	{"cyber": 4}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738981486/gated/zoe2bh2eaphqnv8qxr2h.jpg", "publicId": "gated/zoe2bh2eaphqnv8qxr2h"}	Though not as taboo as it was a century ago, esoteric cybernetics largely remain a mystery. Only the cutting edge of science has made any useful progress into the foray. This Coral Harmonic Array is a prime example of that.	{Brain,Spine}	\N	{"{\\"keywordId\\": 25}"}	\N	f	\N	1	artifact
77	Piety Program Mk. 2	offensive	{"cyber": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738991527/gated/byijnk3mpz3eqpakkiro.jpg", "publicId": "gated/byijnk3mpz3eqpakkiro"}	Men who dedicate their hearts to El Shaddai consider their bodies temporary vessels. Those amongst the Honorguard task themselves with the total protection of deacons, bishops, rhabbis, imams, and the like. That means those in the Honorguard surrender their lives for the wellbeing of their target. \nThis prosthetic leg functions as normal until you choose to use it as a weapon. It unfolds and reconfigures into a smoothbore scattergun. Your attacks with this roll Chromebits. It transforms back as a free action. Your speed is not reduced by the HW trait of this weapon.	{Leg}	17	{}	\N	f	\N	1	uncommon
80	Shock Drop Apparatus	function	{"cyber": 3, "power": 6}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739054920/gated/rbyxfqkireytk7ppxogu.jpg", "publicId": "gated/rbyxfqkireytk7ppxogu"}	Federal Shock Troopers were the most feared soldiers in the Age of War. Their augments and apparati allowed them to breach the toughest facilities from any angle and wreak havoc. As long as you are conscious, you are immune to fall damage. Your Jump distance treats your speed as +1 higher.	{Legs,Back}	20	{}	\N	f	\N	1	uncommon
83	Dive Invader Link	function	{"cyber": 2}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738982909/gated/dtd89iydmxejlpoqjaxc.jpg", "publicId": "gated/dtd89iydmxejlpoqjaxc"}	An invasive and very illegal modification to Cyberlinks, the DIL allows a user to invade other Divers on the Sphere and directly read and write into their brainwaves. While Fulldiving or using a CR-87, you may roll Networked against another Character. If you succeed, you may utilize Gestalt abilities against them as though you had two free hands and line of sight. This must obey normal rules of actions.	{Brain}	15	{}	\N	f	\N	1	rare
28	Genshin 90	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738984412/gated/lv4j8ocmu8udkfordwiv.jpg", "publicId": "gated/lv4j8ocmu8udkfordwiv"}	Old-gen motion sensitivity and path tracing boosts deflection of incoming objects. Add 1 Dice to Parry rolls.	{Eyes}	10	{}	\N	f	\N	1	common
57	Leffduwen K.11	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738988164/gated/pn6nlyqic81eqvkqij0t.jpg", "publicId": "gated/pn6nlyqic81eqvkqij0t"}	This automatic stimulant system reacts to changes in your heart rate corresponding to fight or flight, passively increasing your reaction time. Add +1 success to your Initiative rolls.	{Heart}	11	{}	\N	f	\N	1	common
79	R-INT Rebounders	function	{"cyber": 2, "power": 6}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738992683/gated/ir31kqv5wj4ya2huri4p.jpg", "publicId": "gated/ir31kqv5wj4ya2huri4p"}	Movement charged dynamos augmented by the output only a power cell could achieve. These ballistic combat legs have unrivaled agility, with both horizontal and vertical movement covered. Once per jump, you may jump off of a wall (or similar vertical surface) applying all the normal rules for distance. Additionally, and also once per jump, you may expend 1 PWR to jump while midair. (You may use both during 1 jump.) In combat, these bonus jumps do not consume additional actions.This prosthetic does not consume power through standard operation alone.	{Legs}	20	{}	\N	f	\N	1	uncommon
58	Shinjekiyo Hyper-R	stat	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739054528/gated/y6zgmywyqx9gdmqhecsv.jpg", "publicId": "gated/y6zgmywyqx9gdmqhecsv"}	Ballistic padding in the foot with supporting connective tissue into the shin. Add +1 Speed.	{Feet}	12	{}	\N	f	\N	1	common
74	Blackout Overture	function	{"cyber": 4}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738980922/gated/amu2i91jclbdsrw0gam6.jpg", "publicId": "gated/amu2i91jclbdsrw0gam6"}	Half of the genius in this cybernetic is the onboard AI cranking out freecasting wyrms every millisecond, the other half is the wide net of intercepting sensor-nodes and uploading counter-nodes. Drones, turrets, cameras, robotics, etc. treat you as though they’re Blinded. Attacks relying on cybernetic vision receive Dooming against you. Esoteric abilities are unaffected by this augment.	{Brain,Spine}	\N	{"{\\"keywordId\\": 25}"}	\N	f	\N	1	artifact
82	Cackle Daemon	function	{"cyber": 4}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738981149/gated/vrqsgldzyrcqgeuegwmg.jpg", "publicId": "gated/vrqsgldzyrcqgeuegwmg"}	This on-board AI connects to the Gestalt portions of the brain. Whenever you use Gestalt and deal Sanity Damage, you can roll chromebits or networked against all affected characters. On a success, you afflict them with a Networked Malfunction.	{Brain,Spine}	18	{}	\N	f	\N	1	rare
98	Ant-Lion Redux	offensive	{"cyber": 2}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738980130/gated/kkhha11bllitzffzpqh0.jpg", "publicId": "gated/kkhha11bllitzffzpqh0"}	These deployable cyber blades are utilizable without interfering with 1 handed or 2 handed actions. As an action or reaction, you may make a single melee strike or sneak attack against a target in range. If it was a sneak attack, it does not count as your attack for the turn.	{Leg}	13	{}	1	f	37	1	uncommon
84	Dream Projector	function	{"cyber": 2}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738983412/gated/wplfhdwr79vae1lughoy.jpg", "publicId": "gated/wplfhdwr79vae1lughoy"}	This digital construct housing reacts to your brain’s unique pattern when manipulating the structure of reality. It sends digital wavepatterns that are intercepted by other cyberlinks; these wavepatterns cause bouts of psychosis. You may activate or deactivate this cybernetic at will. When performing a Waking Dream or Exposure, you may also roll Chromebits or Networked against the Networked Rating of all characters within a 30 foot line emanating from you. You deal 1 sanity damage to each character you beat.	{Brainstem}	16	{}	\N	f	\N	1	rare
87	Mortuary Register	function	{"cyber": 2}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738988641/gated/c59h1it3ecdlatm2eulf.jpg", "publicId": "gated/c59h1it3ecdlatm2eulf"}	A connection between the digital and the phantom, this device compares its user’s recognition based brainwaves to a mortuary database. When interacting with a Phantom, you may roll Chromebits or Networked. Any successes are Dice added to the Outerworld rolls to manipulate and investigate the Tatter, as you pull their profile from their former life.	{Brainstem}	14	{}	\N	f	\N	1	rare
85	Face Sculptor	function	{"cyber": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738983952/gated/u8jcyhjenzoh9awgo32f.jpg", "publicId": "gated/u8jcyhjenzoh9awgo32f"}	An overlay of nanite laden artificial skin combined with reactive bone and muscle tissue allows a user to artificially alter their facial construction. The user rolls godhead or chromebits, with the difficulty affected by the specificity of the face and how well the user knows it. A partial success may allow a poor mimicry of a known face.	{"Facial Structure"}	16	{}	\N	f	\N	1	rare
88	DC-7 Anti-Melee Suite	function	{"cyber": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738803330/gated/xysi8k0be51yjox1nbpe.jpg", "publicId": "gated/xysi8k0be51yjox1nbpe"}	Four semi-automated mechanical tendrils aid the user passively. Everytime you parry, you deal 1 damage to the attacker. You can climb a vertical surface using this device at normal speed.	{Spine}	15	{}	6	f	22	1	uncommon
78	Psy-Array	offensive	{"cyber": 6}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738992256/gated/cy7iczilbev0tlml4mqy.jpg", "publicId": "gated/cy7iczilbev0tlml4mqy"}	This experimental device was never meant for the streets. It’s weaponized Gestalt, but by no means is it fully understood what’s going on here. Stimulation of the brain in areas that light up with Gestalt usage results in the amplification of those abilities. So far, there have been no long term survivors of this device. Each of your Gestalt actions is replaced by the enhanced versions below.	{Brain,Neck}	100	{}	\N	f	\N	1	blackMarket
86	Shell Driver	function	{"cyber": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738995145/gated/f4dxzhbvxbfqffvo9mlh.jpg", "publicId": "gated/f4dxzhbvxbfqffvo9mlh"}	A shell drive containing stimulants and neuromuscular connectivity that imitates the process of possession. Increase your possession limit per scene by 1. If you would be knocked unconscious, instead you become Berserked. When you become Wounded or given a Permanent Injury or Insanity or lose consciousness, you may use your reaction to perform Possession. While your possession lasts, temporarily ignore the penalties of your Injury or Insanity.	{Spine}	19	{}	\N	f	\N	1	rare
95	Mazer Beam Cannon	offensive	{"cyber": 4, "power": 3, "currentPower": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735965244/gated/twskj0rcgtgwrvmabwug.jpg", "publicId": "gated/twskj0rcgtgwrvmabwug"}	An energy weapon that laughs in the face of industry bottlenecks. Neutrino Mass Limitations? Ion Field Collapse? Electromagnetic Dispersion? Ha. This energy cannon functions like a normal hand until you choose to use it as a weapon. It can also change back for free. You can spend one or more actions to charge and shoot it. You may roll Cybernetica: Chromebits to shoot.	{Arm}	\N	{"{\\"keywordId\\": 25}"}	6	t	12	1	artifact
93	Laxung Mobilizers	function	{"cyber": 2, "power": 3, "currentPower": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739387276/gated/wmcrcfpxoup7rxj9nvwn.jpg", "publicId": "gated/wmcrcfpxoup7rxj9nvwn"}	A device installed into the pelvic structure. Retractable grappling hooks launch from housing units. For 1 PWR, you can launch these hooks, which impale terrain, and use them to hang, swing, or retract them to pull yourself the full 25 foot length. In combat, shooting and retracting is one movement action. If you don’t shoot and retract, it later requires an action to. 	{Hips}	15	{}	6	t	20	1	uncommon
97	Kenjio Mk. 1	offensive	{"cyber": 2}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739386689/gated/xihmhi4hiquph7c4ijjh.jpg", "publicId": "gated/xihmhi4hiquph7c4ijjh"}	A subdermal compartment conceals a hidden blade. You can attack with the blade mounted in your forearm without using your hand; this attack may roll Cybernetica: Chromebits.	{Arm}	13	{}	1	t	10	1	uncommon
96	Ant-Lion Redux	offensive	{"cyber": 2}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738980130/gated/kkhha11bllitzffzpqh0.jpg", "publicId": "gated/kkhha11bllitzffzpqh0"}	These deployable cyber blades are utilizable without interfering with 1 handed or 2 handed actions. As an action or reaction, you may make a single melee strike or sneak attack against a target in range. If it was a sneak attack, it does not count as your attack for the turn.	{Leg}	13	{}	1	t	37	1	uncommon
100	Federal Rifleman	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738736170/gated/dgslbbbi1cd56ytuazky.jpg", "publicId": "gated/dgslbbbi1cd56ytuazky"}	Updated crosshair tracking and shot prediction. Add 1 dice to Single Shot Rolls.	{Eyelids}	11	{}	6	t	23	1	common
24	N.77 Interloper	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738737616/gated/ugpi65hfqwalzikxdjws.jpg", "publicId": "gated/ugpi65hfqwalzikxdjws"}	An aggressive neural assistant designed to aid in breaching security. Add 1 dice to Upload Rolls.	{Brain}	12	{}	\N	f	\N	1	common
109	Wyrm Mold: Overload	function	{"cyber": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739057846/gated/yeaxznnopvzpn8kvxqpp.jpg", "publicId": "gated/yeaxznnopvzpn8kvxqpp"}	Cook ‘em with their own burners. Overload causes a power feedback loop using their own systems against them.	{Brain}	18	{}	\N	f	\N	1	uncommon
23	Federal Rifleman	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738736170/gated/dgslbbbi1cd56ytuazky.jpg", "publicId": "gated/dgslbbbi1cd56ytuazky"}	Updated crosshair tracking and shot prediction. Add 1 dice to Single Shot Rolls.	{Eyelids}	11	{}	\N	f	\N	1	common
102	CR87 Cyber Deck	function	{"cyber": 2}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738738015/gated/c0uzjecoef5dwchtogbo.jpg", "publicId": "gated/c0uzjecoef5dwchtogbo"}	The Caldwin CR87 is a cerebral and spinal augment that acts as a miniature Sphere Hub once deployed.	{Brain}	15	{}	6	t	21	1	uncommon
99	Kenjio Mk. 1	offensive	{"cyber": 2}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739386689/gated/xihmhi4hiquph7c4ijjh.jpg", "publicId": "gated/xihmhi4hiquph7c4ijjh"}	A subdermal compartment conceals a hidden blade. You can attack with the blade mounted in your forearm without using your hand; this attack may roll Cybernetica: Chromebits.	{Arm}	13	{}	1	t	10	1	uncommon
101	N.77 Interloper	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738737616/gated/ugpi65hfqwalzikxdjws.jpg", "publicId": "gated/ugpi65hfqwalzikxdjws"}	An aggressive neural assistant designed to aid in breaching security. Add 1 dice to Upload Rolls.	{Brain}	12	{}	6	t	24	1	common
20	Laxung Mobilizers	function	{"cyber": 2, "power": 3, "currentPower": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739387276/gated/wmcrcfpxoup7rxj9nvwn.jpg", "publicId": "gated/wmcrcfpxoup7rxj9nvwn"}	A device installed into the pelvic structure. Retractable grappling hooks launch from housing units. For 1 PWR, you can launch these hooks, which impale terrain, and use them to hang, swing, or retract them to pull yourself the full 25 foot length. In combat, shooting and retracting is one movement action. If you don’t shoot and retract, it later requires an action to. 	{Hips}	15	{}	\N	f	\N	1	uncommon
106	Wyrm Mold: BDC	function	{"cyber": 2}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739057192/gated/zuwxk0jiwckpwyaohoev.jpg", "publicId": "gated/zuwxk0jiwckpwyaohoev"}	Biodegenerative Constructs are terrifying wyrms, often seen in D-Mines belonging to powerful corporate security. They cause a target’s cyberlink to fry them, cooking their brain in their skull.	{Brain}	19	{}	\N	f	\N	1	uncommon
105	Wyrm Mold: Clean Slate	function	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739057597/gated/uqabkoszkk2rueqyqc3y.jpg", "publicId": "gated/uqabkoszkk2rueqyqc3y"}	The counterhacker’s Mold; utilize this to dispatch wyrmkillers.	{Brain}	9	{}	\N	f	\N	1	uncommon
108	Wyrm Mold: Psybreaker	function	{"cyber": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739057690/gated/jwvinj57qo5968ywt1oz.jpg", "publicId": "gated/jwvinj57qo5968ywt1oz"}	Break into a target’s psychically enhanced mind through their cyberlink; then, make ‘em go crazy. Causes the target to emit a psychic lash in response.	{Brain}	20	{}	\N	f	\N	1	rare
103	Wyrm Mold: Frazzle	function	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739057798/gated/ccmutld9ltg3zhhmat7b.jpg", "publicId": "gated/ccmutld9ltg3zhhmat7b"}	Splice a target’s optics with a violent string of code that sends all sorts of visual and audio glitches into their system.	{Brain}	1	{}	\N	f	\N	1	uncommon
65	Marian 808s	function	{"cyber": 2, "power": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738988367/gated/vhr4ubncopy1zuodma3i.jpg", "publicId": "gated/vhr4ubncopy1zuodma3i"}	An assortment of articulated autotools and storage for various IVs. \nAs long as you have PWR, you are considered to have Medical Supplies. \nYou may use Cybernetica Chromebits when performing First Aid. Doing so consumes 1 PWR. When performing First Aid, you may expend 1 PWR. Doing so removes an additional viable condition from the target and allows them to use their reaction to stand, take cover, or reload.	{""}	13	{}	\N	f	\N	1	uncommon
37	Ant-Lion Redux	offensive	{"cyber": 2}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738980130/gated/kkhha11bllitzffzpqh0.jpg", "publicId": "gated/kkhha11bllitzffzpqh0"}	These deployable cyber blades are utilizable without interfering with 1 handed or 2 handed actions. As an action or reaction, you may make a single melee strike or sneak attack against a target in range. If it was a sneak attack, it does not count as your attack for the turn.	{Leg}	13	{}	\N	f	\N	1	uncommon
75	B-7 Bomber	offensive	{"cyber": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738980819/gated/f1r9r622emprslapiy4u.jpg", "publicId": "gated/f1r9r622emprslapiy4u"}	The Federal Penal Legion was composed of criminals, rebels, and malcontents that sought a chance at freedom or redemption. Their ranks were composed of “Chop Cops”, soldiers who underwent masscyberization procedures. One of the most common procedures was the installation of the Bomber, a multi-generational projectile launch system. \nThe Bomber functions like a normal arm and hand until you use the Brace action to deploy it. It can be braced while standing. It unfolds and reconfigures into a recoilless shellgun with lateral blast. Your attacks with this may roll Chromebits. It returns to normal as a free action. Your speed is not reduced by this weapon’s HW trait.	{""}	17	{}	\N	f	\N	1	uncommon
27	Crit-Hit 9k	function	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738981646/gated/v8h5hdoxozcjehthefxe.jpg", "publicId": "gated/v8h5hdoxozcjehthefxe"}	A popular augment amongst young warriors, the CH9k identifies the weakspot in an opponent’s defense so that you don’t have to! ™	{Eyes}	11	{}	\N	f	\N	1	uncommon
64	Industrial Labor Assist	function	{"cyber": 2}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738984972/gated/kbr30masfxhw3tqsirml.jpg", "publicId": "gated/kbr30masfxhw3tqsirml"}	This Device is installed along the spine, but most of its hardware is mounted outside of the body. This arm is obviously mechanical and connects to the character’s back, but otherwise has no restrictions to its range of motion or ability, except that it is not biological. The character is considered to have an additional arm. Heavy Weapons can be braced while standing if held by at least 3 arms. Rolls to use the ILA during physical challenges reference Chromebits.	{Spine}	11	{}	\N	f	\N	1	uncommon
35	Kastanar Tower	stat	{"cyber": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738985860/gated/hpkzyt7jyzjkibf1c9xd.jpg", "publicId": "gated/hpkzyt7jyzjkibf1c9xd"}	This noradrenal dispenser lines the spinal column and inserts into the bloodstream at various points. The augmented attentiveness and muscle responsivity increases the user’s evasion by +1.	{Spine}	16	{}	\N	f	\N	1	rare
70	S.9 Studious System	function	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738992776/gated/ftohhqlmustbh8muxiso.jpg", "publicId": "gated/ftohhqlmustbh8muxiso"}	The S.9 is the all encompassing hard drive computing augment. Studying can be done in half the time, and only requires a connection to the Sphere (even for very rare topics). You can roll Chromebits for Specific Recall and Identify checks. Once per day, you can Push an Erudition roll (or one of the listed Chromebits checks) and gain a bonus benefit; your perception of time accelerates allowing you to stretch a moment to near infinite, allowing you to fully plan for a sequence of events. When you are done planning, time snaps back to its normal rate.	{Brain}	14	{}	\N	f	\N	1	uncommon
48	Siegebreaker Standard	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739055022/gated/xnvvi2zvbgaxgpmpbqjs.jpg", "publicId": "gated/xnvvi2zvbgaxgpmpbqjs"}	Strength bone and connective tissue. Add 1 dice to Haymakers and charge attacks.	{Skeleton}	10	{}	\N	f	\N	1	common
41	Intravenal Anti-Venom	defensive	{"cyber": 2, "power": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738985293/gated/auoyzrxqhk4yqsjf8gt5.jpg", "publicId": "gated/auoyzrxqhk4yqsjf8gt5"}	An augment that reactively pumps the bloodstream full of chemical detoxicants. Poisons and weaponized viral devices are both neutralized.	{Liver}	11	{}	\N	f	\N	1	uncommon
36	Lorenzi Lock-Out	stat	{"cyber": 2}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738988258/gated/fh1bpnvzny8wvobfia3p.jpg", "publicId": "gated/fh1bpnvzny8wvobfia3p"}	An augmentation for both brain and cyberlink, the LLO protects the user by increasing network security based on their propensity for Chrome. Add +1 to your Networked TN. 	{Brainstem}	20	{}	\N	f	\N	1	rare
22	DC-7 Anti-Melee Suite	function	{"cyber": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738803330/gated/xysi8k0be51yjox1nbpe.jpg", "publicId": "gated/xysi8k0be51yjox1nbpe"}	Four semi-automated mechanical tendrils aid the user passively. Everytime you parry, you deal 1 damage to the attacker. You can climb a vertical surface using this device at normal speed.	{Spine}	15	{}	\N	f	\N	1	uncommon
56	DN-79 Rehab Aug.	stat	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738983326/gated/sd6o0zlfxm9uhsknclvu.jpg", "publicId": "gated/sd6o0zlfxm9uhsknclvu"}	Minor disk and tissue support in the spinal column. Originally intended to heal paralytic injuries. Add +2 Equip.	{Spine}	10	{}	\N	f	\N	1	common
49	Suhashi E-9	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739055927/gated/vovpr0bqmlr9aoxshkic.jpg", "publicId": "gated/vovpr0bqmlr9aoxshkic"}	Neural load distributor. Add 1 dice to Full Dive rolls.	{Brain}	11	{}	\N	f	\N	1	common
50	Tacvision M9	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739055983/gated/zjtjvicc9l3t48qfxywx.jpg", "publicId": "gated/zjtjvicc9l3t48qfxywx"}	Consolidates cybernetic and weapon info with target tracking software. Add 1 dice to Salvo Rolls.	{Eyeballs}	12	{}	\N	f	\N	1	common
107	Wyrm Mold: Viral Psycho	function	{"cyber": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739057675/gated/vkbcb8c4jmtt97tontog.jpg", "publicId": "gated/vkbcb8c4jmtt97tontog"}	Splice a target’s optics with a violent string of code that sends all sorts of visual and audio glitches into their system.	{Brain}	15	{}	\N	f	\N	1	rare
104	Wyrm Mold: Friendly Fire	function	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739057820/gated/wu1zxyc35gaphmi6k8gz.jpg", "publicId": "gated/wu1zxyc35gaphmi6k8gz"}	Temporarily override a drone or turret’s IFF systems and cause it to fire at a target of your choice.	{Brain}	13	{}	\N	f	\N	1	uncommon
76	Henry Rollers	function	{"cyber": 3, "power": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738984520/gated/x4vnpazuh0dbggfulg6n.jpg", "publicId": "gated/x4vnpazuh0dbggfulg6n"}	Definitely an insane idea, but someone somewhere wanted to hybridize man and vehicle. What’s crazier is that they had the genius to do it. 	{Legs}	20	{}	\N	f	\N	1	uncommon
115	Wyrm Mold: BDC	function	{"cyber": 2}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739057192/gated/zuwxk0jiwckpwyaohoev.jpg", "publicId": "gated/zuwxk0jiwckpwyaohoev"}	Biodegenerative Constructs are terrifying wyrms, often seen in D-Mines belonging to powerful corporate security. They cause a target’s cyberlink to fry them, cooking their brain in their skull.	{Brain}	19	{}	13	f	106	1	uncommon
116	Wyrm Mold: Clean Slate	function	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739057597/gated/uqabkoszkk2rueqyqc3y.jpg", "publicId": "gated/uqabkoszkk2rueqyqc3y"}	The counterhacker’s Mold; utilize this to dispatch wyrmkillers.	{Brain}	9	{}	13	f	105	1	uncommon
120	Lorenzi Lock-Out	stat	{"cyber": 2}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738988258/gated/fh1bpnvzny8wvobfia3p.jpg", "publicId": "gated/fh1bpnvzny8wvobfia3p"}	An augmentation for both brain and cyberlink, the LLO protects the user by increasing network security based on their propensity for Chrome. Add +1 to your Networked TN. 	{Brainstem}	20	{}	9	t	36	1	rare
112	Lu Diplomet	offensive	{"cyber": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739388255/gated/dpzpe2ppoto0rmu9rpou.jpg", "publicId": "gated/dpzpe2ppoto0rmu9rpou"}	A convertible automatic weapon that works and functions like a normal prosthetic. Noble Court Lords and Ladies often utilized bound retainers, men and women who have committed their lives and bodies to the Ad Nobilitatem. These prosthetics ensure that even in political courts where weapons are not allowed, the lord in question maintains firepower superiority. This weapon changes forms as a free action.	{Arm}	17	{}	13	f	16	1	uncommon
114	Suhashi E-9	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739055927/gated/vovpr0bqmlr9aoxshkic.jpg", "publicId": "gated/vovpr0bqmlr9aoxshkic"}	Neural load distributor. Add 1 dice to Full Dive rolls.	{Brain}	11	{}	13	f	49	1	common
121	Mortuary Register	function	{"cyber": 2}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738988641/gated/c59h1it3ecdlatm2eulf.jpg", "publicId": "gated/c59h1it3ecdlatm2eulf"}	A connection between the digital and the phantom, this device compares its user’s recognition based brainwaves to a mortuary database. When interacting with a Phantom, you may roll Chromebits or Networked. Any successes are Dice added to the Outerworld rolls to manipulate and investigate the Tatter, as you pull their profile from their former life.	{Brainstem}	14	{}	9	t	87	1	rare
118	N.77 Interloper	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738737616/gated/ugpi65hfqwalzikxdjws.jpg", "publicId": "gated/ugpi65hfqwalzikxdjws"}	An aggressive neural assistant designed to aid in breaching security. Add 1 dice to Upload Rolls.	{Brain}	12	{}	13	f	24	1	common
113	VUDU 909	stat	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739056429/gated/eablun0vffvnvilkyamd.jpg", "publicId": "gated/eablun0vffvnvilkyamd"}	This neural implant protects the mine from the hazards of Full Dives, primarily D-Mines. It does so by disassociating conscious action through proxy into the Dive. Cowboys say it feels like you’re puppeteering yourself.You reduce D-Mine damage by 1 (regardless of type).	{Brain}	14	{}	13	f	59	1	uncommon
122	Shell Driver	function	{"cyber": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738995145/gated/f4dxzhbvxbfqffvo9mlh.jpg", "publicId": "gated/f4dxzhbvxbfqffvo9mlh"}	A shell drive containing stimulants and neuromuscular connectivity that imitates the process of possession. Increase your possession limit per scene by 1. If you would be knocked unconscious, instead you become Berserked. When you become Wounded or given a Permanent Injury or Insanity or lose consciousness, you may use your reaction to perform Possession. While your possession lasts, temporarily ignore the penalties of your Injury or Insanity.	{Spine}	19	{}	9	t	86	1	rare
117	Wyrm Mold: Viral Psycho	function	{"cyber": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739057675/gated/vkbcb8c4jmtt97tontog.jpg", "publicId": "gated/vkbcb8c4jmtt97tontog"}	Splice a target’s optics with a violent string of code that sends all sorts of visual and audio glitches into their system.	{Brain}	15	{}	13	f	107	1	rare
60	Industrial Refit (B)	stat	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738985174/gated/zejvvyjqt8k4wfrgzty7.jpg", "publicId": "gated/zejvvyjqt8k4wfrgzty7"}	Internal reinforcement spread throughout the body’s core. Add half your Chromebits (rounded up) to your Equip Load. 	{Muscular}	12	{}	\N	f	\N	1	common
119	El Sandorino	function	{"cyber": 5, "power": 3, "currentPower": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735972159/gated/iye8rjrwzfwqbior9nhl.jpg", "publicId": "gated/iye8rjrwzfwqbior9nhl"}	When you see a man moving faster than possible, with bloodshot eyes and hemorrhages coming out of his nose and ears, trust that it’s a Sandorino. Pump the nervous system so fulla juice it could burst; but if it doesn’t, the user gets to move, see, and think faster than they ever have before.	{Brain,Spine}	25	{}	9	t	14	1	blackMarket
126	Armor Grafting	stat	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738980218/gated/tmitcovkhvsxofmfcp5y.jpg", "publicId": "gated/tmitcovkhvsxofmfcp5y"}	Subdermal plating is placed throughout the body in a rather rudimentary manner compared to active armor varieties. The plates provide a more permanent but primitive solution. +1 Armor but -2 Speed.	{Skin}	9	{}	9	t	31	1	common
125	Wyrm Mold: Clean Slate	function	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739057597/gated/uqabkoszkk2rueqyqc3y.jpg", "publicId": "gated/uqabkoszkk2rueqyqc3y"}	The counterhacker’s Mold; utilize this to dispatch wyrmkillers.	{Brain}	9	{}	6	t	105	1	uncommon
32	Construct Fortress	stat	{"cyber": 2}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738981314/gated/unefomak6ougnpafvf4m.jpg", "publicId": "gated/unefomak6ougnpafvf4m"}	Nanite repair centers and an onboard reactive AI increase your resiliency and recovery from psychic attacks. Add half your Chromebits Rating (rounded up) to your Sanity.	{Brain}	15	{}	\N	f	\N	1	uncommon
127	L.3 Bellower	roll	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738987848/gated/xfjei6rf9yrh349z5eer.jpg", "publicId": "gated/xfjei6rf9yrh349z5eer"}	Standard refit for members of the Shaddaian Priesthood. Add 1 dice to Crowdwork and Distract Rolls.	{Throat}	8	{}	9	f	44	1	common
123	XL-19 Speed Refit	stat	{"cyber": 1}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739058072/gated/vrltjh3j59mhxznzbh7j.jpg", "publicId": "gated/vrltjh3j59mhxznzbh7j"}	An augment that efficiently coordinates synergistic movement. Add half your Chromebits (rounded up)  to your Speed. 	{Joints}	12	{}	9	t	61	1	common
124	Wyrm Mold: Overload	function	{"cyber": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739057846/gated/yeaxznnopvzpn8kvxqpp.jpg", "publicId": "gated/yeaxznnopvzpn8kvxqpp"}	Cook ‘em with their own burners. Overload causes a power feedback loop using their own systems against them.	{Brain}	18	{}	6	t	109	1	uncommon
\.


--
-- Data for Name: Error; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Error" (id, "createdAt", title, content, "userId") FROM stdin;
2	2025-01-08 05:12:25.762	Important 6	More big tiddies anime girls and goth thicc mamis	2
1	2025-01-08 04:21:46.397	Important 5	I have a large penis\nHis name is mister schmenis\nhe comes around town\nand all the ladies down\npenis	2
3	2025-01-09 06:21:22.4	Experience and Progression Formatting	The nodes required and the level table appear as just a single line of text without clear differentiation, making it difficult to understand what the table is actually saying. Also this is just genuinely some phenomenal work Ben, we all appreciate the time that you must have been into this project. 	8
4	2025-01-09 06:21:37.972	Perks not registering	Under the perks section of the character sheet, specifically with the name of the perk. When expanded, General perks are listed as "N/A"	7
7	2025-01-16 03:53:02.739	Typo on weapons section	Under the Weapons section, it says "Launcer and Explosives"	7
8	2025-01-28 22:35:22.309	Hobbyist change	Hobbyist Perk has been changed back to 2 separate skills	7
9	2025-02-08 03:19:13.789	Cannot the 0	When trying to remove Henry Rollers PWR, I cannot put it to 0. I want the power to be equal to the number of chicks I bang on a monthly basis. 	6
\.


--
-- Data for Name: Item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Item" (id, name, rarity, grade, picture, price, equipped, category, subcategory, "itemType", description, stats, "characterInventoryId", "baseItemId") FROM stdin;
1	Night Vision Goggles	common	1	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739303837/gated/olhbcjyfvio7fajkzkju.jpg", "publicId": "gated/olhbcjyfvio7fajkzkju"}	3	f	reusable	gadget	Assorted Tools	A simple device that amplifies its light sensitivity granting the user its darksight.	{"power": 3, "weight": 1}	\N	\N
6	Basic Hardware	common	1	""	1	f	consumable	misc	Assorted Tools	A bag of simple tools and hardware. Hand drills, hammers, zip ties, etc. Basic civilian tools. Contains 10 uses before it needs to be refilled (though some uses may not consume materials)	{"weight": 0.2, "maxStacks": 10, "currentStacks": 10}	\N	\N
8	D-Delta 34 DC	common	1	""	2	f	reusable	gadget	Deployable Cover	Double D’s – mercs call ‘em. And they trust ‘em. Activate (action) in the middle of no-man’s land to create a 1 tile armor plated barrier, providing cover.	{"weight": 3}	\N	\N
9	Ga-Ranja	common	1	""	5	f	reusable	gadget	Grappling Hook	Every child’s dream. Can hook onto terrain with a successful Shooting or Hardwired check. Then, it retracts, allowing the character to take the Move action up the wall. Also, allows a player to sling across gaps provided there’s “footing” in the middle. Its maximum length is 50 feet.	{"power": 6, "weight": 2}	\N	\N
2	Powercell	common	1	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739304159/gated/dzlvi3hoydmiv8reedqs.jpg", "publicId": "gated/dzlvi3hoydmiv8reedqs"}	1	f	consumable	misc	Battery	These incredibly dense batteries are far heavier than they look. They’re designed to slot into power armor and other gadgets, and the grade of the power cell decides how many hours it grants. Empty power cells can be charged (8 hours) at special stations. Most devices consume 1 PWR unless otherwise stated. All Powercells grant 3 PWR; a device with more than 3 PWR requires multiple cells. 	{"weight": 0.5, "currentStacks": 1}	\N	\N
7	Criminal Hardware	common	1	""	3	f	consumable	misc	Assorted Tools	An assortment of simple tools of the trade. Glasscutters, lock picks, crow bars, etc. Could be classified as thieves’ tools. Contains 6 uses before it needs to be refilled (though some uses may not consume materials)	{"weight": 0.25, "maxStacks": 6, "currentStacks": 6}	\N	\N
16	Musculo-Antibody Therapy	uncommon	1	""	10	f	consumable	chemicalTherapy	Stimulant	A process in which the body’s healing and immune responses are maximized, increasing resilience but lowering the body’s tolerance for cybernetics.	{"weight": 1, "currentStacks": 1}	\N	\N
18	White-Fast Musculo Anti-Inhibitors	uncommon	1	""	10	f	consumable	chemicalTherapy	Stimulant	Maximize the body’s tendency to develop fast twitch muscle fibers while minimizing the availability of slow endurance fibers.	{"weight": 1, "currentStacks": 1}	\N	\N
20	Red-Slow Musculo Gene Cultivation	uncommon	1	""	10	f	consumable	chemicalTherapy	Narcotic Analgesic	Invert the process of White Fast Anti-inhibition. Instead, inhibit the white fast cells in order to maximize the availability of red slow endurance tissue.	{"weight": 1, "currentStacks": 1}	\N	\N
21	Centennial Fingerbones	uncommon	1	""	19	f	reusable	anomaly	Outerworld	These finger bones belonged to a person who lived over a hundred years, cursing their entire existence. The residual hatred roils off the bones.	{"weight": 1}	\N	\N
23	Night Vision Goggles	common	1	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739303837/gated/olhbcjyfvio7fajkzkju.jpg", "publicId": "gated/olhbcjyfvio7fajkzkju"}	3	f	reusable	gadget	Assorted Tools	A simple device that amplifies its light sensitivity granting the user its darksight.	{"power": 3, "weight": 1, "currentPower": 3}	6	1
15	Criminal Hardware	common	1	""	3	f	consumable	misc	Assorted Tools	An assortment of simple tools of the trade. Glasscutters, lock picks, crow bars, etc. Could be classified as thieves’ tools. Contains 6 uses before it needs to be refilled (though some uses may not consume materials)	{"weight": 0.25, "maxStacks": 6, "currentStacks": 6}	6	7
14	Powercell	common	1	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739304159/gated/dzlvi3hoydmiv8reedqs.jpg", "publicId": "gated/dzlvi3hoydmiv8reedqs"}	1	f	consumable	misc	Battery	These incredibly dense batteries are far heavier than they look. They’re designed to slot into power armor and other gadgets, and the grade of the power cell decides how many hours it grants. Empty power cells can be charged (8 hours) at special stations. Most devices consume 1 PWR unless otherwise stated. All Powercells grant 3 PWR; a device with more than 3 PWR requires multiple cells. 	{"weight": 0.5, "currentStacks": 5}	6	2
17	Anti-Psychotic Neurostabilization	uncommon	1	""	10	f	consumable	chemicalTherapy	Narcotic	By utilizing neuroinhibition, bloodpressure medication, and heartrate control, mental state is preserved at the cost of physical resilience.	{"currentStacks": 1}	\N	\N
19	Neuroconnectivity Chemotherapy	uncommon	1	""	10	f	consumable	chemicalTherapy	Dissociative Anesthetic	Destabilize immune response and maximize neuroplasticity. WARNING: Side effects include a predisposition towards Cyber-Psychosis.	{"weight": 1, "currentStacks": 1}	\N	\N
24	Neuroconnectivity Chemotherapy	uncommon	1	\N	10	t	consumable	chemicalTherapy	Dissociative Anesthetic	Destabilize immune response and maximize neuroplasticity. WARNING: Side effects include a predisposition towards Cyber-Psychosis.	{"weight": 1, "currentStacks": 0}	6	19
\.


--
-- Data for Name: ItemCondition; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ItemCondition" (id, stacks, "conditionId", "weaponId", "armorId", "cyberneticId", "vehicleId", "modificationId", "itemId") FROM stdin;
\.


--
-- Data for Name: Keyword; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Keyword" (id, "keywordType", name, description) FROM stdin;
1	weapon	Melee	This weapon can only strike adjacent targets. Melee weapons can be thrown 2 + (2 x Assault Rating) tiles away. Targets that attempt to leave your range allow you to use your reaction to make a single strike against them. This is an Opportunity Attack.
3	weapon	Concealed	Increase the TN to notice this weapon by 1 while it is hidden. Multiple instances stack.
4	weapon	Impaling	If this weapon damages its target, it is impaled, unable to move from the nearest piece of terrain. The spike can be removed, but you lose 2 Health removing it. If this is on a melee weapon, the attacker can choose whether one hit in their attack or flurry impales the target. In that case, both characters cannot move, and the removal of the spike is contested by either Assault or Threshold. Removal still causes 2 Health to be Lost. (The attacker can choose to remove it for 1 action.)
5	weapon	Mastery	This attack uses your Assault rating as its Flurry rating. Dual Wielding applies.
6	weapon	Small Caliber	When attacked by this weapon, armor treats its rating as +1 higher.
7	weapon	Shotgun	Lethal and common, a bad combo. Characters adjacent to targets you strike take 2 damage per hit if their evasion is broken.
8	weapon	2H	This weapon requires 2 hands to use. You cannot attack with a 2H weapon if you performed an action that required 1 or more free hands to do (or vice versa), unless you have an augment allowing you to do so.
9	weapon	Pistol	Basic, easy to use. All pistols have Concealed. Pistols are not subject to Ranged in Melee penalties.
10	weapon	Anti-Armor	This weapon’s damage is not reduced by Armor. It reduces BP normally.
11	weapon	Reliable	This weapon cannot receive Jams.
12	armor	Adaptive Camo	The TN to notice you is increased by 1.
14	armor	Deflector Field	This armor is unaffected by the Anti-Armor and High Impact keywords.
15	armor	Dispersive	Blast damage is reduced by an additional 2 points. While you have BP, you cannot be concussed.
16	armor	Energized Plating	Anti-Armor attacks have their damage reduced by 2. Negates High Impact.
18	armor	Ready Judge	You can expend 1 power as a free action to utilize the suit’s auto stabilizers and onboard AI adjutant. Then you can brace a Heavy Weapon while standing and fire two salvos per turn. You retain this benefit until you move or unlock.
19	armor	Torque	Consume 1 power. Once per turn, as a free action, add +2 dice to any assault or threshold check, except flurries.
20	weapon	Cybernetic	A weapon that is built into a cybernetic augment. A cybernetic weapon does have a weight or price value associated with it. When attacking with this weapon (unless otherwise specified), you may roll Cybernetica: Chromebits instead of Violence: Assault for melee weapons or Violence: Shooting for ranged weapons.
21	weapon	SMG	Fire rate and compact size make for a relatively easy to use platform. Attacks with an SMG within 3 tiles (15 feet) gain Booming.
22	weapon	Rapid-Fire	This weapon adds an additional +X dice when performing a Salvo attack.
24	weapon	HW	Beastly weapons that test strength and skill alike. Heavy Weapons must be Braced before firing. Equipping a Heavy Weapon reduces your speed by 2. Reloading one requires two actions.
25	cybernetic	Prototype	A special class of cybernetic, describing augments which never saw a mass market release and have extremely limited public exposure. Be it because of danger, unpredictability or any other reason, these augments have been kept hidden from the public eye. Use of them is sure to turn heads and attract attention, both wanted and unwanted. Only available through the Proto-chrome perk.
26	weapon	Spray	A spray weapon cannot attack beyond its listed range. A Spray weapon selects a target; all characters adjacent to and in a line between you and the target are targeted. Roll once. Some weapons may not list a range; in that case, the weapon’s maximum range is listed after the Spray. Spray Heavy Weapons can be braced while standing. Firing a Spray weapon is always a salvo attack.
29	weapon	Backdraft	After attacking, you may expend 1 shot from its magazine; compare the roll against all characters within 1 tile of (you and the target). On a hit, give the targets the Burning X condition.
30	weapon	Barometry	After attacking, you may expend 1 shot from its magazine. On a hit the target receives the Bleed X and Slowed X conditions.
31	weapon	Blast	This attack deals half damage to all characters within X tiles of the target. Only the initial target is affected by Anti-Armor. If the attack roll misses, the target is still damaged by the blast (half damage).
33	weapon	Bolt-Action	After firing this weapon, an action must be used to work the bolt before it can be fired again.
34	weapon	Concuss	A successful attack grants a stack of Concussion. At 2 stacks, the target is Stunned 2.
35	weapon	Detonate	After successfully hitting a target, this attack deals a separate instance of damage equal to the rating.
36	weapon	Incendiary	This weapon applies Persistent Damage: Burning X.
37	weapon	Jams	This weapon’s rolls have Dooming.
38	weapon	Lateral Blast	When you attack, characters directly to your right and left take 1 damage.
40	weapon	Needle	You can apply poisons and similar substances to this weapon’s attacks. 1 dose of poison applies to 1 salvo’s worth of ammo.
41	weapon	Reach	This melee weapon has range.
43	weapon	Shocking	This weapon applies Persistent Damage: Shocked X.
44	weapon	Silent	This weapon does not make enough noise to attract attention unless the listener is within 30 feet.
45	weapon	Stormsurge	After attacking, you may expend 1 shot from its magazine. The attack receives Shocking X, but triggers for every character within 10 feet of you and the target.
13	armor	Armor	Armor is worn when equipped. It has a limited ability to intercept damage from incoming attacks. You can wear multiple kinds of armor, but each one loses BP each time it takes damage. 
28	weapon	Backblast	When this weapon attacks, it deals its Blast damage to a target 1 Tile behind you. 
32	weapon	Cloudkill	After attacking or parrying, you may expend 1 shot from its magazine; Compare the roll against any adjacent target. On success it deals X damage.
2	weapon	1H	This weapon requires 1 hand to make an attack, thus you can wield two at once. Dual Wielding may increase Flurry and Salvo Ratings (pg. 71) but suffers from the 2H penalties listed below. 1F weapons require a leg, and thus do not require nor benefit from hands.
27	weapon	Chaining	Apply this weapon’s attack roll to a target up to X tiles away from the original. 
50	weapon	Rifle	Professional, stable, and deadly. Rifles can be Braced to increase their range by 1.5x.
51	weapon	Psychic	This “weapon” deals damage to Sanity instead of Health. Its Damage and traits reference the enemy’s Ward instead of their Armor. The rules for ranged actions and dual wielding apply to it. Its range is equal to your range for Insertion.
52	weapon	Lacerating	If the target loses Health, this weapon applies Persistent Damage: Bleed X.
53	weapon	High Impact	Each hit in an attack or Salvo causes the target to lose 1 health if armor nullifies any of this weapon’s normal damage. Does not affect vehicles.
54	armor	Disappearance	As long as this armor has BP remaining, rolls to notice you have Dooming.
55	armor	Cloak	Cloaks can be worn over Power Armor, and take damage priority first.
57	armor	Sprint	Consume 1 power. Once per turn, as a free action, add +4 to your speed until the end of turn.
58	weapon	Anti-Material	This weapon strikes all targets in a line drawn through its primary target. One roll is applied to all targets’ evasion. This weapon pierces the first obstruction or cover in its line of fire, and cannot be parried.
59	weapon	Blade Dance	After negating a melee attack with a Parry, you can make an additional melee strike against your attacker. Your Parry rolls are Booming.
60	weapon	Blaze	This weapon does not suffer ranged in melee penalties. All characters adjacent to this weapon when it fires receive Burning 1.
61	weapon	Bunker Buster	Before performing a single strike or haymaker with this weapon, you can expend 1 shot from its magazine to grant the attack Spray.
62	weapon	Centered	This weapon’s attack originates from its user, but does not target them.
63	weapon	Chaff	Attacks from this weapon cause all targets struck to receive dooming on Cybernetica skills until their next turn ends.
64	weapon	Charge	This weapon can be charged before firing. It can store up to 3 charges for 1 minute after the first charge. When it fires, it gains 10 damage and 10 range for each charge, and expends all charges.
65	weapon	Cloud	The blast left by this weapon lingers as a cloud for 1d6 rounds. The Cloud applies the attack’s condition at the end of a character’s turn if inside.
66	weapon	Combi	This weapon has an alternate fire profile. When it uses the second profile, it consumes X ammunition.
67	weapon	Cyclone	After attacking, you may expend 1 shot from its magazine. The target is either pushed an additional 5 feet away or knocked prone. A target pushed into terrain takes an additional instance of 2 damage. Being pushed into another character causes both to take 2 damage.
68	weapon	Death Sting	When you perform a haymaker with this weapon, you may expend its magazine. If your attack dealt damage (after armor), then the target loses 4 more health.
69	weapon	Defensive	This weapon can flurry or haymaker and Raise Shield in the same turn.
70	weapon	Double Load	This weapon requires two actions to reload and consumes two magazines per reload.
71	weapon	Drone	This weapon does not have a weapon type, and is only usable by a drone.
72	weapon	Engine	This weapon can expend 1 shot from its magazine to grant its next haymaker or single attack x2 Range. It also can strike an additional target within range.
73	weapon	Heavy Pistol	This weapon has the traits of Pistols and Heavy Weapons, except that it doesn’t reduce speed and it can be braced while standing.
74	weapon	Heavy Rifle	This weapon has the traits of Rifles and Heavy Weapons, except that it can be braced an additional time to gain its Rifle range bonus, and it doesn’t reduce speed.
75	weapon	Heavy Shotgun	This weapon has the traits of Shotguns and Heavy Weapons, except that its shotgun trait can hit an additional target, and it can be braced while standing.
76	weapon	Henshin!	This weapon can be transformed for an action by expending 1 shot from its magazine. When you transform, every character adjacent to you takes 2 damage. For the next minute, it uses the second profile. Afterwards, the user is forced to switch back to the original profile.
77	weapon	MOD	This rifle can switch between weapon profiles for 1 action. Exchange its Rifle trait for Shotgun; gain 2 damage, lose 1 salvo, and lose 20 range. Exchange its Rifle trait for SMG; lose 1 damage, gain 2 salvo, and lose 20 range.
78	weapon	Splash	This weapon can target 2 characters with 1 attack, as long as they are adjacent.
79	weapon	Taze	This weapon does not suffer ranged in melee penalties. All characters adjacent to this weapon when it fires receive Shocked 1.
80	weapon	Turret	This weapon is operated by a \npassenger in its copilot/gunner seat. It cannot be operated by the main pilot of the vehicle.
81	weapon	Tyrant	By attacking a vehicle, this weapon allows the user to additionally roll Networked against its target. If successful, the user forces the vehicle to take one action.
85	weapon	Grenade	An explosive weapon that must be thrown when used. You may roll Hardwired when throwing grenades.
86	weapon	Mine	An explosive weapon that that can be placed. A mine explodes when stepped on.
82	weapon	Vehicle	Vehicle weapons are weapons that can only be use on a vehicle. Each vehicle weapon attached to a vehicle takes up one of that vehicle's WPN slots. Vehicles do not have to Brace weapons. 
56	armor	Heavenly	While wearing this armor, your jump bracket is increased by +1 and you are immune to fall damage.
87	weapon	Blinding	Effects with blinding create visual obstruction, causing attacks in or through them to receiving the Blinded condition. Characters within the radius of a blinding effect are also Blinded.
39	weapon	Launcher	This weapon uses grenades as its ammunition. Its stats are altered accordingly. It can target its salvo shots separately, and can be braced while standing. Loaded grenades are counted in the weapon’s weight.
89	armor	Cybernetic	Armor that is built into a cybernetic augment. Cybernetic armor does not have a weight or price value associated with it.
17	armor	Power	This suit is self propelled and fueled by an onboard batteries. While the suit has Power (PWR), it treats its weight as 0, and can use special abilities. You cannot wear multiple types of armor while wearing power armor. 1 Power is consumed by 1 hour of activity or by 1 turn of combat. 
\.


--
-- Data for Name: Modification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Modification" (id, name, price, "modificationType", description, "baseModificationId", "characterInventoryId", grade, rarity, "vehicleId") FROM stdin;
1	Copilot	11	Intelligence augment	A copilot wired into the vehicle’s control systems allows you to summon the vehicle to your location wirelessly. This also allows you to control the vehicle remotely while Full Diving.	\N	\N	1	common	\N
2	Mounted LMG	18	Mobile Firepower	Your vehicle now sports a turret mounted Kairos LMG (using the exact profile, it is always braced). Manning the weapon requires an action. Your vehicle’s passenger rating is reduced by 1, and requires at least 1 passenger to mount the weapon. This weapon modification does not use a WPN slot on the vehicle it's mounted to. (Turret)	\N	\N	1	common	\N
3	Armor Plating	8	Hull Plating	Simple as can be. Put more metal on the thing and make it tougher to kill, letting you get cozier on the ride to death. Reduce the speed of your vehicle by 50 mph (1 bracket). If your vehicle’s speed bracket is already 1, then it is unaffected by this reduction. Increase its armor by 2.	\N	\N	1	common	\N
4	Smoke Dispensers	7	Rear Mounted Aid	These dispensers can spew out a blast of smoke behind the vehicle, leaving two adjacent clouds (10 feet wide by 50 feet long) in its wake. The smoke lasts for 1d6 rounds unless dispersed.	\N	\N	1	common	\N
5	ODS – 3	12	Security Augment	A digital security system that cordons off the electrical and digital systems of a vehicle. Raises the network TN of hacking your car by +1.\n	\N	\N	1	common	\N
6	Boost Injectors	15	Engine Augment	Once per day, for the duration of one scene, you can increase your vehicle's speed by +50 MpH (+1 Bracket).	\N	\N	1	common	\N
7	Oil Slick	8	Rear Mounted Aid	Live out your spy dreams, and lay out an oil slick behind your car. Can be refilled in a garage in 1 hour. The next motorized check any ground vehicle pursuing you makes is Dooming.	\N	\N	1	common	\N
8	Drone Bay	12	Hardware	This device acts as a drone buoy and drone storage device, centered on the vehicle. An anchor can be held by another individual. The drone user does not have to be the driver. A Full Diver can also control the drone from a Pod.	\N	\N	1	common	\N
9	Chromatic Coat	8	“Cosmetic” Augment	This reactive coating shifts hues based on electrical signals. It takes 30 seconds to change the color of the car, for cosmetic or disguise purposes.	\N	\N	1	common	\N
10	Full-Burn Jets (Salamander)	0	Mobility Augment	Maximizing the suit’s mobility, this multivector thrusters allow the suit to perform jumps. It can jump, referencing the Assault table appropriate, and treating its speed as 12 for such purposes. It is also immune to fall damage while operable, and can glide 5 feet forward for every 5 feet it falls.	\N	\N	1	common	\N
11	Cuttleskin (Salamander)	0	Concealment	Reactive electrocells and an onboard AI allow it to camouflage itself. While idle or unmoving, the suit has a TN of 3 to be visually noticed. Once per scene, the suit can be rendered invisible to human and digital vision for 1 minute. The invisibility is lost if the suit attacks or is successfully struck during this time. While invisible, other characters (relying on the above senses) treat the suit as though they’re blinded.	\N	\N	1	common	\N
13	Comm-Spike (Salamander)	0	Security Augment	This deployable digital communication interceptor scans the sphere for nearby vehicle connections. The user can filter by size, speed, and other such characteristics, and can even mark vehicles in line of sight, tracking targets within 1000 feet of its current position.	\N	\N	1	common	\N
12	The SML (Salamander)	0	Grenade Launcher	Twin magazine fed launchers mounted on the shoulders. Adds considerable combat utility to the salamander; its special munitions are supplied by regular sourced ammunition, and the user can choose any standard grenade (not ones that increase the base price) and order them in the magazines.	\N	\N	1	common	\N
\.


--
-- Data for Name: Modifier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Modifier" (id, type, stat, operator, "valueType", attribute, skill, value, duration, "actionId", "cyberneticId", "itemId", "perkId") FROM stdin;
1	stat	armor	add	number	\N	\N	1	\N	\N	31	\N	\N
2	stat	speed	subtract	number	\N	\N	2	\N	\N	31	\N	\N
3	stat	maxSanity	add	skill	cybernetica	networked	\N	\N	\N	\N	\N	230
4	stat	speed	add	skill	violence	subterfuge	\N	\N	\N	\N	\N	229
5	stat	maxCyber	add	skill	peace	barter	\N	\N	\N	\N	\N	227
6	stat	maxHealth	add	skill	esoterica	godhead	\N	\N	\N	\N	\N	225
9	stat	maxSanity	add	skill	esoterica	godhead	\N	null	\N	\N	\N	49
10	stat	maxCyber	add	skill	cybernetica	networked	\N	\N	\N	\N	\N	26
12	stat	maxWeight	add	skill	violence	shooting	\N	\N	\N	\N	\N	224
13	stat	maxHealth	add	skill	peace	treatment	\N	\N	\N	\N	\N	223
14	stat	maxHealth	add	number	\N	\N	2	\N	\N	\N	\N	134
15	stat	maxCyber	add	number	\N	\N	2	\N	\N	\N	\N	134
16	stat	permanentInjuries	add	number	\N	\N	1	\N	\N	\N	\N	134
17	roll	\N	add	number	\N	\N	1	\N	190	42	\N	\N
18	roll	\N	add	number	\N	\N	1	\N	94	23	\N	\N
19	stat	maxSanity	add	skill	peace	rhetoric	\N	\N	\N	\N	\N	228
20	stat	speed	add	skill	cybernetica	motorized	\N	\N	\N	\N	\N	226
23	stat	maxCyber	add	number	\N	\N	2	{"unit": "month", "value": 1}	\N	\N	19	\N
24	stat	maxSanity	subtract	number	\N	\N	1	null	\N	\N	19	\N
25	stat	maxCyber	add	number	\N	\N	2	{"unit": "month", "value": 1}	\N	\N	24	\N
26	stat	maxSanity	subtract	number	\N	\N	1	null	\N	\N	24	\N
27	stat	maxHealth	add	number	\N	\N	1	\N	\N	53	\N	\N
28	stat	maxSanity	add	skill	cybernetica	chromebits	\N	\N	\N	32	\N	\N
29	stat	weight	add	number	\N	\N	2	\N	\N	56	\N	\N
30	stat	evasion	add	number	\N	\N	1	\N	\N	35	\N	\N
31	stat	speed	add	number	\N	\N	1	\N	\N	58	\N	\N
33	roll	\N	add	number	\N	\N	2	null	194	\N	\N	138
34	stat	armor	add	number	\N	\N	1	null	\N	126	\N	\N
35	stat	speed	subtract	number	\N	\N	2	null	\N	126	\N	\N
\.


--
-- Data for Name: PatchNote; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PatchNote" (id, "createdAt", version, title, content) FROM stdin;
1	2025-01-14 04:22:19.666	0.01	formal welcome and vehicle content update	{"html": "<h2 dir=\\"ltr\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">Welcome</span></h2><p style=\\"text-align: start;\\"><br></p><p dir=\\"ltr\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">Thank you for joining Electric Death Online. I hope you enjoy this project as an accompaniment to Reece's RPG, \\"Glam and the </span><i><em style=\\"white-space: pre-wrap;\\">Electric Death</em></i><span style=\\"white-space: pre-wrap;\\">\\". This new page will be dedicated to keeping users up to date and informed of additions to EDO, changes and re-balancing regarding game mechanics, and general announcements (It can be accessed at any time by clicking the icon on the left side of the top navigation bar).</span></p><p dir=\\"ltr\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">As long as I (Ben) have the time to do so (which is unlimited right now), I will be dedicated to expanding the functionality of EDO, adding missing game content and implementing gameplay mechanics to enhance the experience of our in person campaign sessions. Here's a short term EDO progress roadmap that you can expect to see rollouts for over the coming few weeks:</span></p><p style=\\"text-align: start;\\"><br></p><ol><li value=\\"1\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">Finish adding missing game content to the codex (items and gadgets, combat conditions, chem therapy, missing book pages etc). In time, you can expect all of the content found in the google docs to be accessible here.</span></li><li value=\\"2\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">Implement a character specific inventory, equipment page and item purchasing mechanics. You will be able to create loadouts for your characters and equip items up to your weight and cyber levels. This will look much like any system you can find in an RPG video game.</span></li><li value=\\"3\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">Implement campaign mechanics and gang related content. Soon your GM will be able to create your campaign, and add you to it. You'll be able to see all of the information pertaining to your gang, characters and loadouts of the other players in your campaign as well as GM created NPCs that exist in your specific campaign setting.</span></li></ol><p style=\\"text-align: start;\\"><br></p><h2 dir=\\"ltr\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">Content  update</span></h2><p style=\\"text-align: start;\\"><br></p><p dir=\\"ltr\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">This content update includes the following changes:</span></p><p style=\\"text-align: start;\\"><br></p><ol><li value=\\"1\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">Vehicles, vehicle weapons and vehicle modifications have been added to the codex under the vehicles drop down menu</span></li><li value=\\"2\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">The systems for users with Admin permissions to create or update vehicles, vehicle weapons and vehicle modifications have been added</span></li><li value=\\"3\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">The patch notes page has been added</span></li><li value=\\"4\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">Major changes to how items are sorted and can be viewed in the sidebar</span></li><li value=\\"5\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">Major changes to background data handling, making data acquisition and loading times much faster</span></li></ol><p style=\\"text-align: start;\\"><br></p><h2 dir=\\"ltr\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">A special request</span></h2><p style=\\"text-align: start;\\"><br></p><p dir=\\"ltr\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">As Reece and I add content like vehicles, weapons, armor, cybernetics etc, it takes a lot of time to generate fitting artwork to display alongside the items. I think it would be a great idea (as well as super helpful) for the users of EDO the pick a few of their favorite items and set about generating the artwork for them to help with the expedition of EDO content. If you decide to help out this way, send the pictures to either Reece or I and we will upload them to represent the item chosen. Some guidelines for generating art:</span></p><p style=\\"text-align: start;\\"><br></p><ul><li value=\\"1\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">We have been using the Microsoft Bing image creator. We've gotten the best art result from this AI art generator so please use it too.</span></li><li value=\\"2\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">We've prefaced our art generation prompts with something like, \\"black and white manga cyberpunk style...\\". Doing so should give you art that fits the desired aesthetic.</span></li><li value=\\"3\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">In special cases, one accent color is allowed to highlight the picture. Examples of this can be seen in the art for El Sandorino and Ignition Greatsword. This should only be used for items of great power and rarity. The art for most items should remain black and white.</span></li></ul><p style=\\"text-align: start;\\"><br></p><p dir=\\"ltr\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">Thanks  and I hope everyone decides to help out and leave their mark on EDO!</span></p>", "nodes": {"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"tag": "h2", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Welcome", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "Thank you for joining Electric Death Online. I hope you enjoy this project as an accompaniment to Reece's RPG, \\"Glam and the ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "Electric Death", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"mode": "normal", "text": "\\". This new page will be dedicated to keeping users up to date and informed of additions to EDO, changes and re-balancing regarding game mechanics, and general announcements (It can be accessed at any time by clicking the icon on the left side of the top navigation bar).", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "As long as I (Ben) have the time to do so (which is unlimited right now), I will be dedicated to expanding the functionality of EDO, adding missing game content and implementing gameplay mechanics to enhance the experience of our in person campaign sessions. Here's a short term EDO progress roadmap that you can expect to see rollouts for over the coming few weeks:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "ol", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Finish adding missing game content to the codex (items and gadgets, combat conditions, chem therapy, missing book pages etc). In time, you can expect all of the content found in the google docs to be accessible here.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 2, "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Implement a character specific inventory, equipment page and item purchasing mechanics. You will be able to create loadouts for your characters and equip items up to your weight and cyber levels. This will look much like any system you can find in an RPG video game.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 3, "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Implement campaign mechanics and gang related content. Soon your GM will be able to create your campaign, and add you to it. You'll be able to see all of the information pertaining to your gang, characters and loadouts of the other players in your campaign as well as GM created NPCs that exist in your specific campaign setting.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "number", "direction": "ltr"}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Content  update", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "This content update includes the following changes:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "ol", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Vehicles, vehicle weapons and vehicle modifications have been added to the codex under the vehicles drop down menu", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 2, "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "The systems for users with Admin permissions to create or update vehicles, vehicle weapons and vehicle modifications have been added", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 3, "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "The patch notes page has been added", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 4, "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Major changes to how items are sorted and can be viewed in the sidebar", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 5, "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Major changes to background data handling, making data acquisition and loading times much faster", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "number", "direction": "ltr"}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "A special request", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "As Reece and I add content like vehicles, weapons, armor, cybernetics etc, it takes a lot of time to generate fitting artwork to display alongside the items. I think it would be a great idea (as well as super helpful) for the users of EDO the pick a few of their favorite items and set about generating the artwork for them to help with the expedition of EDO content. If you decide to help out this way, send the pictures to either Reece or I and we will upload them to represent the item chosen. Some guidelines for generating art:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "ul", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "We have been using the Microsoft Bing image creator. We've gotten the best art result from this AI art generator so please use it too.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 2, "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "We've prefaced our art generation prompts with something like, \\"black and white manga cyberpunk style...\\". Doing so should give you art that fits the desired aesthetic.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 3, "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "In special cases, one accent color is allowed to highlight the picture. Examples of this can be seen in the art for El Sandorino and Ignition Greatsword. This should only be used for items of great power and rarity. The art for most items should remain black and white.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "bullet", "direction": "ltr"}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Thanks  and I hope everyone decides to help out and leave their mark on EDO!", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr"}}}
2	2025-01-22 08:03:12.791	0.02	conditions and modifiers content update	{"html": "<h2 dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">Content  update</span></h2><p dir=\\"ltr\\" style=\\"text-align: start;\\"><br></p><p dir=\\"ltr\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">This content update includes the following changes:</span></p><p style=\\"text-align: start;\\"><br></p><ol><li value=\\"1\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">Conditions have been added to the codex.</span></li><li value=\\"2\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">\\"Modifiers\\" have been added to items and perks. What this means is that when an item or perk specifically boosts a stat or adds extra dice to a roll, the bonus will be clearly stated on the object or perk. This will require some data entry to get everything up to date so changes may not be reflected immediately</span></li><li value=\\"3\\" style=\\"text-align: start;\\"><span style=\\"white-space: pre-wrap;\\">Filter options for actions and keywords have been adjusted on their respective pages</span></li></ol>", "nodes": {"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Content  update", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "This content update includes the following changes:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "ol", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Conditions have been added to the codex.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 2, "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\"Modifiers\\" have been added to items and perks. What this means is that when an item or perk specifically boosts a stat or adds extra dice to a roll, the bonus will be clearly stated on the object or perk. This will require some data entry to get everything up to date so changes may not be reflected immediately", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 3, "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Filter options for actions and keywords have been adjusted on their respective pages", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "number", "direction": "ltr"}], "direction": "ltr"}}}
3	2025-02-04 23:38:51.934	0.03	massive update	{"html": "<h2 dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">Character equipment and shopping update</span></h2><p><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">In this update, app users are given full control of their characters. You can now purchase items for your characters, equip them to your characters and view your characters dynamically updated stats through your changing loadout. There is now even integrated functionality to use ammo, power and block point stats on equipped items, making keeping track of the state of your equipment that much easier during each session. To make use of the new features follow the guidelines below:</span></p><p><br></p><ol><li value=\\"1\\"><span style=\\"white-space: pre-wrap;\\">Head over to your character list and select one to make active from the new drop down menu found at the top. This will populate the sidebar with that characters equipment and inventory lists and allow you to head over the codex to shop for them.</span></li><li value=\\"2\\"><span style=\\"white-space: pre-wrap;\\">On each purchasable item in the codes, there is an add to cart icon listed next to the price in the top right corner. To purchase something, simply click on that icon and it will be added to your cart.</span></li><li value=\\"3\\"><span style=\\"white-space: pre-wrap;\\">Once your cart is not empty, a cart icon will appear next to your active character's name on the top navigation bar. To view your cart click on that icon.</span></li><li value=\\"4\\"><span style=\\"white-space: pre-wrap;\\">Once you've added all the items you want to purchase, head to the cart and complete checkout. Make sure you have enough profits allocated to your character or you will not be able to check out. (Don't cheat)</span></li><li value=\\"5\\"><span style=\\"white-space: pre-wrap;\\">When checkout has completed, head over to the characters tab and look through the new options to view your inventory and the equipment page. In the inventory lists, when expanding each item you own, you will see a new modify button on the bottom left. Using this function, you can fully modify the stats of a weapon you own using the games item customization mechanic. Make sure your GM approves of the modifications so you're not too OP.</span></li><li value=\\"6\\"><span style=\\"white-space: pre-wrap;\\">In the new equipment page, you can now actively equip your items to your character by double clicking them in the inventory list at the bottom. Equipping items will modify your stats accordingly. Power armor will also add its weight to your equip load when out of power so watch out!</span></li><li value=\\"7\\"><span style=\\"white-space: pre-wrap;\\">Perk and cybernetic stat modifiers will now also adjust your stats accordingly. and Unique actions and roll modifiers attributed to the cybernetics your character has equipped will show up on the right side of the equipment page allowing you to view all the benefits of your loadout at once.</span></li><li value=\\"8\\"><span style=\\"white-space: pre-wrap;\\">Reece's penis is enormous, wow just gargantuan. </span></li></ol><p><br></p><h2 dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">Other important additions</span></h2><p><br></p><ol><li value=\\"1\\"><span style=\\"white-space: pre-wrap;\\">Items now have rarity and grades associated with them! They are listed on each item card.</span></li><li value=\\"2\\"><span style=\\"white-space: pre-wrap;\\">Each item has a default rarity of common so Reece and I will have to sift through them to update them to their actual gameplay rarities.</span></li><li value=\\"3\\"><span style=\\"white-space: pre-wrap;\\">Each item in the codex starts at grade 1 and will only be changed with your personal item modifications. Ask your GM about appropriate grade levels and stats associated with them when modifying equipment.</span></li><li value=\\"4\\"><span style=\\"white-space: pre-wrap;\\">A codex wide search function has been added as the first link on the sidebar. It searches all codex items by name, description, keyword or a combination of all 3.</span></li><li value=\\"5\\"><span style=\\"white-space: pre-wrap;\\">I've upgraded the server hosting to always be active. You will no longer experience load times when the app has not been accessed for 15 minutes or more</span></li></ol><p><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">\\t</span><span style=\\"white-space: pre-wrap;\\">I'm sure there are lots of bugs hidden in the app with this large update so please keep me updated with any error reports you find and report them through the error reporting system to the best of your ability.</span></p>", "nodes": {"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Character equipment and shopping update", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "In this update, app users are given full control of their characters. You can now purchase items for your characters, equip them to your characters and view your characters dynamically updated stats through your changing loadout. There is now even integrated functionality to use ammo, power and block point stats on equipped items, making keeping track of the state of your equipment that much easier during each session. To make use of the new features follow the guidelines below:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "ol", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Head over to your character list and select one to make active from the new drop down menu found at the top. This will populate the sidebar with that characters equipment and inventory lists and allow you to head over the codex to shop for them.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 2, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "On each purchasable item in the codes, there is an add to cart icon listed next to the price in the top right corner. To purchase something, simply click on that icon and it will be added to your cart.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 3, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Once your cart is not empty, a cart icon will appear next to your active character's name on the top navigation bar. To view your cart click on that icon.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 4, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Once you've added all the items you want to purchase, head to the cart and complete checkout. Make sure you have enough profits allocated to your character or you will not be able to check out. (Don't cheat)", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 5, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "When checkout has completed, head over to the characters tab and look through the new options to view your inventory and the equipment page. In the inventory lists, when expanding each item you own, you will see a new modify button on the bottom left. Using this function, you can fully modify the stats of a weapon you own using the games item customization mechanic. Make sure your GM approves of the modifications so you're not too OP.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 6, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "In the new equipment page, you can now actively equip your items to your character by double clicking them in the inventory list at the bottom. Equipping items will modify your stats accordingly. Power armor will also add its weight to your equip load when out of power so watch out!", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 7, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Perk and cybernetic stat modifiers will now also adjust your stats accordingly. and Unique actions and roll modifiers attributed to the cybernetics your character has equipped will show up on the right side of the equipment page allowing you to view all the benefits of your loadout at once.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 8, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Reece's penis is enormous, wow just gargantuan. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "number", "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Other important additions", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "ol", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Items now have rarity and grades associated with them! They are listed on each item card.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 2, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Each item has a default rarity of common so Reece and I will have to sift through them to update them to their actual gameplay rarities.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 3, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Each item in the codex starts at grade 1 and will only be changed with your personal item modifications. Ask your GM about appropriate grade levels and stats associated with them when modifying equipment.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 4, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "A codex wide search function has been added as the first link on the sidebar. It searches all codex items by name, description, keyword or a combination of all 3.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 5, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "I've upgraded the server hosting to always be active. You will no longer experience load times when the app has not been accessed for 15 minutes or more", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "number", "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "\\t", "type": "tab", "style": "", "detail": 2, "format": 0, "version": 1}, {"mode": "normal", "text": "I'm sure there are lots of bugs hidden in the app with this large update so please keep me updated with any error reports you find and report them through the error reporting system to the best of your ability.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr"}}}
4	2025-02-11 19:55:35.199	0.04	items content update	{"html": "<h2 dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">App changes</span></h2><p dir=\\"ltr\\"><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">This new update allows for the addition of all the general items found in the codex. This includes:</span></p><p dir=\\"ltr\\"><br></p><ol><li value=\\"1\\"><span style=\\"white-space: pre-wrap;\\">Chemical therapy</span></li><li value=\\"2\\"><span style=\\"white-space: pre-wrap;\\">Chemical assistance</span></li><li value=\\"3\\"><span style=\\"white-space: pre-wrap;\\">Anomalies</span></li><li value=\\"4\\"><span style=\\"white-space: pre-wrap;\\">Gadgets</span></li><li value=\\"5\\"><span style=\\"white-space: pre-wrap;\\">Misc. consumables like criminal hardware</span></li></ol><p dir=\\"ltr\\"><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">Once all the item's data have been added to the app by either Reece or I, they will available for purchase.</span></p><p dir=\\"ltr\\"><br></p><p dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">Weapons and armor can now have unique actions attached to them. The reason for this addition is to separate the function of actions and keywords. For example, the \\"Torque\\" keyword found on some power armor, functions as an action with costs rather than a static effect. Therefore, the Torque keyword will be removed and it's functionality will be added to the appropriate armor sets as an action. This adjustment will take place for all applicable weapons and armor such as the Beam Cannon, Lion's Regalia etc.</span></p><p dir=\\"ltr\\"><br></p><h2 dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">Gameplay changes</span></h2><p dir=\\"ltr\\"><br></p><ol><li value=\\"1\\"><span style=\\"white-space: pre-wrap;\\">Skill point stat bonuses have been decreased from 2 stat points per skill point to 1 stat point per skill point. This means that if you create a character with 4 points in chromebits, you will now be awarded 4 bonus cyber points as opposed to 8. This applies for all stat bonuses earned this way. The change was made to encourage variability in character builds without overly disadvantaging characters who do not choose to put points in the skills responsible for providing stat bonuses. (This change is effective immediately and applies to all characters on the app. Adjust builds accordingly)</span></li><li value=\\"2\\"><span style=\\"white-space: pre-wrap;\\">Movement actions have been adjusted in the following way: The first movement made during a turn  moves at full speed. Each subsequent movement made in a turn after the first moves at half speed.</span></li><li value=\\"3\\"><span style=\\"white-space: pre-wrap;\\">In combat, a player can perform up to two single shot or single strike attacks per turn, but not in conjunction with salvos, flurries or haymakers. If a character performs a salvo, flurry or haymaker, they may not perform another action or make a movement action for the remainder of that turn.</span></li></ol><p><br></p><h2 dir=\\"ltr\\"><span style=\\"white-space: pre-wrap;\\">Bug fixes</span></h2><p><br></p><ol><li value=\\"1\\"><span style=\\"white-space: pre-wrap;\\">Previously non-admins were accidentally blocked from modifying their own inventory items. This has been remedied and all items owned can now be modified.</span></li></ol>", "nodes": {"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "App changes", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "This new update allows for the addition of all the general items found in the codex. This includes:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"tag": "ol", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Chemical therapy", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 2, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Chemical assistance", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 3, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Anomalies", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 4, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Gadgets", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 5, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Misc. consumables like criminal hardware", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "number", "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Once all the item's data have been added to the app by either Reece or I, they will available for purchase.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Weapons and armor can now have unique actions attached to them. The reason for this addition is to separate the function of actions and keywords. For example, the \\"Torque\\" keyword found on some power armor, functions as an action with costs rather than a static effect. Therefore, the Torque keyword will be removed and it's functionality will be added to the appropriate armor sets as an action. This adjustment will take place for all applicable weapons and armor such as the Beam Cannon, Lion's Regalia etc.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Gameplay changes", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"tag": "ol", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Skill point stat bonuses have been decreased from 2 stat points per skill point to 1 stat point per skill point. This means that if you create a character with 4 points in chromebits, you will now be awarded 4 bonus cyber points as opposed to 8. This applies for all stat bonuses earned this way. The change was made to encourage variability in character builds without overly disadvantaging characters who do not choose to put points in the skills responsible for providing stat bonuses. (This change is effective immediately and applies to all characters on the app. Adjust builds accordingly)", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 2, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Movement actions have been adjusted in the following way: The first movement made during a turn  moves at full speed. Each subsequent movement made in a turn after the first moves at half speed.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 3, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "In combat, a player can perform up to two single shot or single strike attacks per turn, but not in conjunction with salvos, flurries or haymakers. If a character performs a salvo, flurry or haymaker, they may not perform another action or make a movement action for the remainder of that turn.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "number", "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Bug fixes", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "ol", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Previously non-admins were accidentally blocked from modifying their own inventory items. This has been remedied and all items owned can now be modified.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "number", "direction": "ltr"}], "direction": "ltr"}}}
\.


--
-- Data for Name: Perk; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Perk" (id, name, description, requirements) FROM stdin;
7	Chromed Out	You gain +2 Cyber points. When all of your cyber points are being used, attempts to intimidate using Chromebits gain Lucky.	{"cybernetica": {"points": 0, "skills": {"chromebits": {"points": 1}}}}
8	Mass Default	Once per scene, you may take an augmented Reload Action; doing so reloads and refreshes all cybernetics (as long as munitions/cells are available) in addition to the normal effects.	{"cybernetica": {"points": 0, "skills": {"chromebits": {"points": 2}}}}
9	Proto-Chrome	When you select this perk, you receive 1 of 4 unique cybernetic augments. They are listed in the cybernetic section “Prototype Augments”. You or a trusted associate are able to repair or rebuild this cybernetic if it is damaged or lost.	{"cybernetica": {"points": 0, "skills": {"chromebits": {"points": 4}}}}
10	The Flesh is Weak	Once per day, when you become Wounded, you take an extra turn after the current one ends. You still have your normal turn in initiative order.	{"cybernetica": {"points": 0, "skills": {"chromebits": {"points": 3}}}}
13	Guerrilla Pattern	You can use the Jury Rig action to create Shields, Frag, Incendiary, and Smoke Grenades, or Gas Masks. Select one, then roll Hardwired, making up to that many copies of your chosen item. You may attempt this roll once per scene.	{"cybernetica": {"points": 0, "skills": {"hardwired": {"points": 2}}}}
14	IFF Redux	You can use Rewire to undo the targeting parameters of a turret, drone, or similar automated hardware. This causes the object to treat your enemies as hostile and your allies as friendlies.	{"cybernetica": {"points": 0, "skills": {"hardwired": {"points": 2}}}}
15	Old Grids	When rolling to navigate the sewers or city, you may always use Hardwired. If you do, your rolls gain Lucky.	{"cybernetica": {"points": 0, "skills": {"hardwired": {"points": 1}}}}
16	Product Blindspot	When attempting to avoid surveillance systems, you may roll Hardwired instead of Subterfuge.	{"cybernetica": {"points": 0, "skills": {"hardwired": {"points": 2}}}}
17	Rerouting	When one of your mounted drones or cybernetics runs out of power, you can reload its power cell as a free action by draining another device’s PWR.	{"cybernetica": {"points": 0, "skills": {"hardwired": {"points": 1}}}}
18	Systemic Mapping	Accessing a facility’s electronic hardpoint allows you to map out the entire electrical grid, giving you a rough estimate of all points of electrical interactivity.	{"cybernetica": {"points": 0, "skills": {"hardwired": {"points": 2}}}}
25	Coerced Malfunction	When afflicting an enemy with a Malfunction, you may choose which one.	{"cybernetica": {"points": 0, "skills": {"networked": {"points": 2}}}}
27	Glitch Parade	When the duration of a Malfunction ends, the target is immediately affected by a different random Malfunction. Can only affect a target once per scene.	{"cybernetica": {"points": 0, "skills": {"networked": {"points": 3}}}}
28	Godfather	You have earned the support of a Rogue AI, so long as you remain in its favor. Once per session, you can call upon the AI to aid you. For the remainder of the scene, whenever you apply a Wyrm or Malfunction to a target, the Godfather applies a copy to another viable target you’re aware of.	{"cybernetica": {"points": 0, "skills": {"networked": {"points": 4}}}}
24	Rote and Practice	When performing a maneuver, your rolls are Booming.	{"cybernetica": {"points": 0, "skills": {"motorized": {"points": 2}}}}
19	Firing Platform	Your Passengers receive Booming on Salvo attacks made against characters not in a vehicle. 	{"cybernetica": {"points": 0, "skills": {"motorized": {"points": 1}}}}
21	Old Ways	Declare 1 vehicle (at a time). That vehicle receives +50% cargo space as bonus Concealed Space. Any items in this space receive +2 to their Detection TN. 	{"cybernetica": {"points": 0, "skills": {"motorized": {"points": 2}}}}
20	Midnight Sun	While driving or in a passenger seat of a vehicle, Esoterica rolls treat your Motorized as their TN instead of the normal requirement. 	{"cybernetica": {"points": 0, "skills": {"motorized": {"points": 3}}}}
12	Brigade Tactics	When you issue a command to a drone or turret, all viable targets within a 3 tile radius of it receive and follow it. 	{"cybernetica": {"points": 0, "skills": {"hardwired": {"points": 4}}}}
224	Artillery Fanatic	Add your Shooting Rating to your Equip. \n	{}
2	Benefactor	When you select this perk, for every odd upgrade level you possess, you receive a common cybernetic. For every odd upgrade level after that, you receive a new common cybernetic. At level 5 and beyond, you may choose uncommons instead. 	{"cybernetica": {"points": 0, "skills": {"chromebits": {"points": 3}}}}
26	Cowboy Junkie	Add your Networked rating to your Cyber.	{}
6	Born to Chrome	Declare one Cybernetic you have currently equipped. You ignore its Cyber cost. 	{"cybernetica": {"points": 0, "skills": {"chromebits": {"points": 3}}}}
11	APM’s	You can repeat the Command Action one time per turn.	{"cybernetica": {"points": 0, "skills": {"hardwired": {"points": 3}}}}
22	JinKing	As a reaction while driving a Vehicle, you may Dodge an incoming Attack by rolling Motorized, reducing the attack’s successes by yours. You cannot dodge Spray attacks this way. 	{"cybernetica": {"points": 0, "skills": {"motorized": {"points": 3}}}}
1	Etched Infant	Some children are born in turmoil, and need mystical protection. Some Shanty Tribes and Nomad Packs tattoo these children with Runes. You gain +1 Ward permanently. 	{"esoterica": {"points": 0, "skills": {"mysticism": {"points": 2}}}}
29	Neural Null	Perform an Upload: if successful, remove a condition originating from cybernetic, networked, or other digital/robotic means from a target.	{"cybernetica": {"points": 0, "skills": {"networked": {"points": 1}}}}
31	Voices in the Code	Whenever you successfully Upload a Wyrm or a Malfunction into a target, they lose 1 sanity.	{"cybernetica": {"points": 0, "skills": {"networked": {"points": 3}}}}
33	Figmentary	When using the Insertion Action, you can create auditory illusions instead of dealing damage. You can also use it on an unconscious target to create imperfect or incomplete false memories. (You cannot erase what you and your gang just did, but you can disguise and mislead it.)	{"esoterica": {"points": 0, "skills": {"gestalt": {"points": 2}}}}
34	Mass Hypnosis	You may use Esoterica Gestalt instead of Peace Rhetoric when performing Crowdwork. Reputation losses associated with this (See Rhetoric) are doubled.	{"esoterica": {"points": 0, "skills": {"gestalt": {"points": 1}}}}
35	Mind Fortress	You are either trained or naturally resistant to Esoteric effects. Your TNs against such rolls receive +1, and your rolls against such effects are Booming.	{"esoterica": {"points": 0, "skills": {"gestalt": {"points": 2}}}}
36	Overreach	Double the range of any Gestalt ability or effect.	{"esoterica": {"points": 0, "skills": {"gestalt": {"points": 2}}}}
37	Psychic Artillery	You can take the Psy-Brace action, which functions the same as the Brace action (but can be done while standing), but “braces” your Psychic Salvo. While braced, Psycho Salvo becomes 2H, but adds +2 salvo and +1 damage.	{"esoterica": {"points": 0, "skills": {"gestalt": {"points": 2}}}}
38	Psydiving	When performing Psyreading, you can enter a comatose state to enter their mind. While in this state, your body is asleep but your mind can plumb a target’s memory to learn their secrets. You can experience any unguarded memories, but secrets require a contested Gestalt Roll.	{"esoterica": {"points": 0, "skills": {"gestalt": {"points": 3}}}}
40	Scream	Roll Gestalt against all characters within 30 feet of you, dealing Sanity damage equal to your Gestalt Rating to all that are struck.	{"esoterica": {"points": 0, "skills": {"gestalt": {"points": 1}}}}
41	Church of Recitation	You can quote deliberate passages when using Exposure. You still do not know how a man will react to them. Roll twice on the Exposure table and choose one. Reroll Doubles.	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 2}}}}
42	Deja Vu	Sometimes, you experience things before they happen. Once per session, you may claim about 5-10 seconds of time to rewind, returning to just before the sequence of events, which plays out like normal save for your interaction, as you recall the sequence from your dreams.	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 4}}}}
43	Dream Mass	Once per day, you can enter a sleepy trance, where you slip between the dream and real world. You wander aimlessly for 1 hour. Afterwards, restore your sanity points and return to Sane.	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 2}}}}
45	Gnomic Obstruction	Coax the little creatures that live in the places that men cannot see. Once per scene, make a Godhead check. If successful, you grant a weapon the Jams trait until or unless it is sanctified.	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 1}}}}
46	Portaling	You may use Godhead to discover the locations of portals, or Sleeping Eyes,  spread throughout the world. Upon finding one, you can attempt to force your waking body through it. Make a Godhead Check, with a TN decided by the GM (based on the destination). On a success, you end up at the Portal’s destination. On a failure, you may end up at any portal, and may be unable to immediately travel back through.	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 2}}}}
50	Children of Folds	Wring from tiny spaces little rodent-like dreamcreatures that are said to originate from inside the Sleepers’ minds. Once per day, roll Godhead. Summon a number of Neurocytes equal to the successes. They will attack your enemies autonomously or otherwise raise havoc. Then, after 1 scene, they disperse into the sewers.	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 3}}}}
49	Gnostic Piety	Add your Godhead rating to your Sanity. 	{}
225	Mottled Flesh	Add your Godhead Rating to your Health. \n	{}
30	Scorched Earth	Whenever a character successfully hacks you (Upload, etc.) you can choose to cause you and the target to lose Sanity equal to your Networked Rating.	{"cybernetica": {"points": 0, "skills": {"networked": {"points": 1}}}}
32	Wyrm Grafting	When you perform an Upload, you have a 1 in 3 chance of refilling an expended Wyrm Shell.	{"cybernetica": {"points": 0, "skills": {"networked": {"points": 2}}}}
47	Revelation	Lose 1 Sanity, increased by 1 for each use of this ability per Session. Receive Divine Inspiration, information that will keep you alive and (usually) out of captivity; it may not always be “good”. 	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 1}}}}
44	Mirror of Spinning Glass	Once per day, you may use an Action to roll Godhead. For each Success, create an illusory image of any character within Line of Sight. When targeting a character with any number of images, the attacker must first succeed on a Godhead Check (TN = # of their images). If they fail, they attack an image instead, destroying it upon dealing damage. 	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 3}}}}
48	Witness All Yesterdays	Once per day, contest the target with Godhead (line of sight). You grant them Stunned X, where X is the amount of Successes you exceed them by. This is a Salvo Attack. 	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 3}}}}
52	Exorcism	You can use the Treat Wounds action, rolling Esoterica Mysticism instead, and targeting conditions and effects from the paranormal. You must still expend uses from a Medpack, modified for your esoteric purposes.	{"esoterica": {"points": 0, "skills": {"mysticism": {"points": 2}}}}
53	Palindromic Totems	You are able to work the runic structure of your Totems to “read” forward and backward. You may choose two effects to apply with your Rites.	{"esoterica": {"points": 0, "skills": {"mysticism": {"points": 4}}}}
54	Sanctified Munition	You know how to ward ammunition and projectiles. You may declare a number of magazines or projectiles equal to your Mysticism Rating each day. These magazines can damage creatures immune to traditional damage. You have +1 Ward while your weapon is loaded with Sanctified Munition.	{"esoterica": {"points": 0, "skills": {"mysticism": {"points": 2}}}}
56	Voidshadow	You are undetectable by Gestalt, Godhead, or Outerworld methods. If you act against a paranormal creature, or someone using those methods, they treat themselves as though they are blinded and deafened towards you.	{"esoterica": {"points": 0, "skills": {"mysticism": {"points": 4}}}}
57	Wyrding Ways	Your melee and throwing attacks can damage beings immune to traditional damage. They also deal +2 damage to paranormal creatures in general.	{"esoterica": {"points": 0, "skills": {"mysticism": {"points": 1}}}}
58	Broken Mind, Broken Body	When either Wounded or Deranged, you can maintain two possessions simultaneously. When using Possession, you do so twice while in this condition, and must maintain both. (reroll doubles)	{"esoterica": {"points": 0, "skills": {"outerworld": {"points": 3}}}}
59	Enduring Possessions	You gain a number of extra rounds of possession equal to your Outerworld Rating before you must roll to maintain.	{"esoterica": {"points": 0, "skills": {"outerworld": {"points": 2}}}}
61	Ghostmind	You can experience the last few moments of a ghost’s life. If those events are deemed traumatic enough, you may need to roll Outerworld to resist taking Sanity Damage (or even normal damage!).	{"esoterica": {"points": 0, "skills": {"outerworld": {"points": 2}}}}
62	Ouija Methodology	Using a simple method of communication (which could be digital if you also possess the Ghost in the Machine Perk), ghosts can speak through you. The method is of your choice and the GM’s approval.	{"esoterica": {"points": 0, "skills": {"outerworld": {"points": 1}}}}
63	Sallow Vessel	You can perform an additional possession every scene.	{"esoterica": {"points": 0, "skills": {"outerworld": {"points": 3}}}}
64	Shaped Possession	You mold phantoms as they possess your body. You roll twice on the possession table and choose one to apply. Reroll doubles.	{"esoterica": {"points": 0, "skills": {"outerworld": {"points": 2}}}}
65	Siccing Curse	Once per scene, cause a phantom to pursue a target you can see. While they are pursued, you can use your reaction to grant a roll they’re about to make Dooming. This lasts until the scene ends.	{"esoterica": {"points": 0, "skills": {"outerworld": {"points": 2}}}}
66	Contemporary Swordplay	When selling stolen goods to a fence, your barter checks are lucky.	{"peace": {"points": 0, "skills": {"barter": {"points": 2}}}}
67	Deal Theory	Once per scene, during the course of a Deal, negate the price effect of your opponent gaining the Upper Hand. You still choose whether or not to Double Down.	{"peace": {"points": 0, "skills": {"barter": {"points": 3}}}}
68	El Producto	When dealing with mercantile products in a situation that would call for Subterfuge rolls (such as concealing them), you may roll Barter instead.	{"peace": {"points": 0, "skills": {"barter": {"points": 2}}}}
70	Market Data	You always know the market value of goods and products, and can correctly estimate hauls at a glance. You receive +2 Dice when estimating, and do so without spending an action.	{"peace": {"points": 0, "skills": {"barter": {"points": 1}}}}
71	Palm Greaser	Due to the frequency with which you “grease palms”, characters are satisfied with half the amount they’d normally expect when taking a bribe.	{"peace": {"points": 0, "skills": {"barter": {"points": 2}}}}
72	Scams and Ploys	You are always aware if a character is attempting to scam, mislead, or short you on some sort of business deal. This does not tell you how, only that something is off.	{"peace": {"points": 0, "skills": {"barter": {"points": 2}}}}
73	The Ringer	When selling product directly to an individual for profit margins, you earn +1d6p.	{"peace": {"points": 0, "skills": {"barter": {"points": 1}}}}
74	Tasks Thee	You’ve become an expert provocateur. Once per scene, when making a Deal, you may force your rival to Double Down.	{"peace": {"points": 0, "skills": {"barter": {"points": 2}}}}
230	Submariner	Add your Networked Rating to your Sanity. \n	{}
229	Silent Haste	Add your Subterfuge Rating to your Speed. \n	{}
227	Only Money!	Add your Barter Rating to your Cyber. \n	{}
228	Self-Assurance	Add your Rhetoric Rating to your Sanity. \n	{}
226	Need for Speed	Add your Motorized Rating to your Speed. \n	{}
55	Replicate Totemry	You can have more than one Totem active at a time.	{"esoterica": {"points": 0, "skills": {"mysticism": {"points": 2}}}}
69	Grand Economics	Whenever you earn profit margins (and repeating every 10 margins earned in one instance), you have a 1 in 3 chance of earning +3p.	{"peace": {"points": 0, "skills": {"barter": {"points": 4}}}}
75	Bilateral Study	When you study you may choose two topics. After rolling, you can distribute your questions between the two, and can do each question one at a time this way.	{"peace": {"points": 0, "skills": {"erudition": {"points": 3}}}}
76	Font of Knowledge	Whenever you succeed on an Erudition check, and your result allows you to ask a question, you may ask 2 instead.	{"peace": {"points": 0, "skills": {"erudition": {"points": 2}}}}
77	Lightning Round	When Pushing an Erudition roll in combat, it doesn’t use an action. This effect can only occur once per turn.	{"peace": {"points": 0, "skills": {"erudition": {"points": 2}}}}
78	Orchestrated Study	When you study, every non-goon character that helps you (see collective action) can choose to grant +2 dice to the roll, regardless of their Erudition.	{"peace": {"points": 0, "skills": {"erudition": {"points": 2}}}}
79	Sequenced Computations	In combat, after succeeding on an Erudition check to identify or recall information, you may make another such check without expending an action.	{"peace": {"points": 0, "skills": {"erudition": {"points": 3}}}}
80	Tactical Superiority	When you succeed on a roll to identify a foe, you grant that foe -1 armor until your next turn.	{"peace": {"points": 0, "skills": {"erudition": {"points": 3}}}}
81	Gnostic Dialogue	During the course of dialogue, if a skill check is called for to recall information, you may roll Peace Rhetoric instead, convincing the other person to share their information instead. This does not work if the other person is similarly ignorant on the subject.	{"peace": {"points": 0, "skills": {"rhetoric": {"points": 2}}}}
83	Second Impression	The first Rhetoric roll you fail per scene doesn’t impact your relation with the target or the crowd’s mood.	{"peace": {"points": 0, "skills": {"rhetoric": {"points": 2}}}}
84	To Whom It May Concern	When you take the Distract action, you target a point and affect everyone within 10 feet of it.	{"peace": {"points": 0, "skills": {"rhetoric": {"points": 2}}}}
85	Well Known	All contacts, old and new, receive +1 to their Relation with you.	{"peace": {"points": 0, "skills": {"rhetoric": {"points": 3}}}}
86	Zealous Fervor	When performing Crowdwork, you can sway people to actions far beyond their normal allowances. With enough motivation, you can even sway groups of people to certain death.	{"peace": {"points": 0, "skills": {"rhetoric": {"points": 4}}}}
87	Combat Diagnosis	You can roll Diagnosis on a target and treat it as though you rolled Identify.	{"peace": {"points": 0, "skills": {"treatment": {"points": 2}}}}
88	Inspiring Fieldwork	When dragging or treating a stunned or unconscious character, they regain enough consciousness to take their turn. Though they are unable to take movement actions, they may attack, use items, special techniques, or perform rude gestures.	{"peace": {"points": 0, "skills": {"treatment": {"points": 2}}}}
89	Minimum E-Med	You can perform First Aid without any supplies. That character cannot benefit from this ability for the remainder of the day.	{"peace": {"points": 0, "skills": {"treatment": {"points": 1}}}}
90	Multi-track Treating	When you remove a condition from a target, you may remove an additional one. Both must be viable target’s for your method of removal.	{"peace": {"points": 0, "skills": {"treatment": {"points": 3}}}}
91	Next Patient	You can repeat the First Aid Action on different targets.	{"peace": {"points": 0, "skills": {"treatment": {"points": 1}}}}
92	Oathbreaking	You can use first aid on enemies. Roll treatment against an adjacent target’s evasion. If successful, you can apply one of the following status effects: Bleed, Disarmed, Poisoned, or Slowed.	{"peace": {"points": 0, "skills": {"treatment": {"points": 2}}}}
93	Rigorous Standards	Your First Aid heals the target by 3 per success instead of 2.	{"peace": {"points": 0, "skills": {"treatment": {"points": 3}}}}
94	Surgical Strike	Once per scene, you can give an attack Anti-Armor. Then, the target rolls Threshold against the attack’s TN. If they succeed, they are Slowed. If they fail, they are Stunned (2).	{"peace": {"points": 0, "skills": {"treatment": {"points": 3}}}}
95	Blistering Pace	Every time you take the parry reaction, you gain a stack of Frenzy. You can expend 2 stacks of Frenzy to make a Strike as a part of your parry.	{"violence": {"points": 0, "skills": {"assault": {"points": 2}}}}
96	Blood, Guts, and Chrome	Everytime you reduce an enemy to 0 Health with a melee attack, enemies within line of sight take 2 Sanity damage.	{"violence": {"points": 0, "skills": {"assault": {"points": 2}}}}
97	Body Blows	Your haymakers can, if you choose, push your target an additional 5 feet away. If they impact another object or character, both take 1 additional instance of damage.	{"violence": {"points": 0, "skills": {"assault": {"points": 2}}}}
98	Bounding Ram	You may turn while charging. You can also perform a Jump Charge, replacing the normal distance with your horizontal or vertical jump distance.	{"violence": {"points": 0, "skills": {"assault": {"points": 1}}}}
99	Flurry Genius	You can distribute your Flurry Strikes to different targets. Characters struck by your Flurry Strikes do not receive Booming when attacking you this round.	{"violence": {"points": 0, "skills": {"assault": {"points": 2}}}}
100	Follow Through	Your haymakers may hit an additional target in range, triggering any effects from the original attack.	{"violence": {"points": 0, "skills": {"assault": {"points": 3}}}}
101	Frenzy Flurry	Every Flurry Strike you land grants a stack of Frenzy. You may expend 6 stacks of Frenzy to make an additional attack this turn (beyond the limit). You can only benefit from this exchange once per turn.	{"violence": {"points": 0, "skills": {"assault": {"points": 4}}}}
102	Heaven and Earth	You may roll assault when using Pistols. Your dual wielding flurries can alternate their attacks between pistols and melee weapons.	{"violence": {"points": 0, "skills": {"assault": {"points": 2}}}}
103	Heroic	Once per scene, you can ignore the penalties of the Slowed and Stunned conditions until the end of your turn.	{"violence": {"points": 0, "skills": {"assault": {"points": 2}}}}
104	Juggernaut	While Charging, you knock aside any character your size or smaller or any object your size or smaller. If you would collide with an object, you deal (Max HP + Assault) damage to that object. If it would be destroyed and you have distance remaining, you may continue charging. If you have charge distance remaining when you reach your target, you may carry them the remaining distance.	{"violence": {"points": 0, "skills": {"assault": {"points": 2}}}}
105	Juggler	You may repeat the Throw action once per turn. You may use your reaction to Contest the attack roll of a Thrown Weapon targeting somewhere within 5 feet of you. If you succeed, you may throw the item back at the attacker.	{"violence": {"points": 0, "skills": {"assault": {"points": 2}}}}
106	Liver Shot	Once per scene, you can unleash an empowered Haymaker that stuns (2) its target.	{"violence": {"points": 0, "skills": {"assault": {"points": 2}}}}
107	Parry Genius	You can parry ranged attacks with melee weapons or unarmed cybernetics. Spray AND Blast weapons cannot be parried this way.	{"violence": {"points": 0, "skills": {"assault": {"points": 2}}}}
108	Swordbreaker	When you negate all damage through parrying a melee weapon, you give that weapon the Damaged condition.	{"violence": {"points": 0, "skills": {"assault": {"points": 1}}}}
110	Breach and Clear	You can use Submachine Guns in melee without penalty. You can salvo fire a submachine gun after a charge.	{"violence": {"points": 0, "skills": {"shooting": {"points": 1}}}}
111	Controlled Burst	If your weapon has a salvo rating larger than 2, you can instead treat it as 2. When you do, you may temporarily clear one condition of your choice affecting that roll.	{"violence": {"points": 0, "skills": {"shooting": {"points": 1}}}}
112	Contained Impact	When declaring an AoE shooting attack (Blast or Spray), you may declare up to two contiguous tiles to be exempt from the attack.	{"violence": {"points": 0, "skills": {"shooting": {"points": 1}}}}
113	Maximal Firepower	Increase Spray weapons range by 10 feet. Increase Blast radius by 5 feet.	{"violence": {"points": 0, "skills": {"shooting": {"points": 3}}}}
115	Professionalism	Your rifle attacks reduce Cover and Prone bonuses by 1. Using an action or reaction, you can negate the Jams condition.	{"violence": {"points": 0, "skills": {"shooting": {"points": 2}}}}
116	Shell Painting	Your shotgun attacks can hit two adjacent targets. Roll once against both targets. Both targets cannot suffer the additional attack from the shotgun keyword, but can both count targets adjacent to them for it.	{"violence": {"points": 0, "skills": {"shooting": {"points": 2}}}}
117	Sturm	Every time you fire a rifle, you may move up to half your speed.	{"violence": {"points": 0, "skills": {"shooting": {"points": 3}}}}
118	Suciedad Kid	All SMGs gain Concealed for you. Shooting attacks from concealment gain +1 salvo.	{"violence": {"points": 0, "skills": {"shooting": {"points": 2}}}}
119	Swift Lumbering	Heavy weapons do not slow you down. You can brace heavy weapons while standing. If held by 3 or more arms, your heavy weapons are braced.	{"violence": {"points": 0, "skills": {"shooting": {"points": 3}}}}
120	Unto the Breach	You can use an action and expend a full magazine in a given direction. Moving towards that direction grants your allies +2 speed. Enemies in that direction of fire are Slowed.	{"violence": {"points": 0, "skills": {"shooting": {"points": 1}}}}
121	Vector Shot	If you fire a single shot, you can ricochet it. Choose a point within range; treat that point as the origin of your shooting attack. This attack cannot be reacted to, ignores cover and prone bonuses, and does not require you to see your target, as long as you’re aware of their location. The attack must still be within your max range.	{"violence": {"points": 0, "skills": {"shooting": {"points": 3}}}}
122	Character Actor	When using Subterfuge to craft a disguise or feign a personality, your GM grants you common knowledge of an average version of that figure. More successes grants more specific knowledge, which may be given moment to moment, rather than all in advance.	{"violence": {"points": 0, "skills": {"subterfuge": {"points": 3}}}}
123	Executor	If your Sneak Attack leaves a target with 4 or less Health, it brings them to 0 instead.	{"violence": {"points": 0, "skills": {"subterfuge": {"points": 4}}}}
124	Manufactured Alias	Attempts to track you based on reputation and rumor treat their rolls as Unlucky.	{"violence": {"points": 0, "skills": {"subterfuge": {"points": 2}}}}
125	Picking Perfectionist	Once you have successfully picked a lock at a specific location, you automatically succeed on all other locks at that location, save special individuals.	{"violence": {"points": 0, "skills": {"subterfuge": {"points": 2}}}}
126	Quickchange	Once per scene, you may make a subterfuge roll. Success allows you to instantly change your appearance to something unrecognized.	{"violence": {"points": 0, "skills": {"subterfuge": {"points": 3}}}}
127	Slipfeint	If you are restrained or otherwise arrested, you can feign capture. Eventually, you can roll Subterfuge to slip your bonds, even those that might normally not allow such an attempt.	{"violence": {"points": 0, "skills": {"subterfuge": {"points": 2}}}}
109	Bullet Time	You can use pistols to Parry projectiles. Spray and Blast Weapons cannot be parried. Doing so consumes 1 salvo of ammunition from your weapon. 	{"violence": {"points": 0, "skills": {"shooting": {"points": 3}}}}
128	Snatching Dog	When failing a roll to pickpocket or performing similar activities, you can still take the targeted object, but the target is aware and may react.	{"violence": {"points": 0, "skills": {"subterfuge": {"points": 1}}}}
129	Beast Mode	When you become Wounded, you gain +2 speed and shed all your negative conditions (including persistent damage).	{"violence": {"points": 0, "skills": {"threshold": {"points": 2}}}}
130	Cyber Barbarian	You may roll Threshold instead of Assault for Improvised Weapons and unarmed attacks. Increase the damage of an improvised weapon by +1 per hand it requires.	{"violence": {"points": 0, "skills": {"threshold": {"points": 2}}}}
131	Full Metal Tank	Persistent Damage effects (Bleed, Burning, Damaging Poison, etc.) end after 1 round for you.	{"violence": {"points": 0, "skills": {"threshold": {"points": 2}}}}
132	Maximum Effort	You add an additional +1 dice when you Push It.	{"violence": {"points": 0, "skills": {"threshold": {"points": 2}}}}
133	Neo Angel	You can use your reaction to intercept an attack targeting an adjacent character. The attack resolves with you as its target. You can make a parry as a part of this reaction.	{"violence": {"points": 0, "skills": {"threshold": {"points": 2}}}}
143	Mamba	Whenever a target you poisoned ends their turn (while poisoned), they lose 2 Health.	{}
144	Ordered Solution	Declare one item (such as smoke grenades or power cells) or weapon. The chosen item is always considered to be sourced.	{}
145	Sanguinity	Whenever a character loses health due to a Bleed you inflicted on them, you can remove 1 condition currently affecting you, unless it is  the result of a permanent injury or insanity.	{}
51	Anchoring	When you use Binding on a paranormal force or creature, the target is stunned in addition to its normal effects. 	{"esoterica": {"points": 0, "skills": {"mysticism": {"points": 3}}}}
114	Pistolero	You can distribute your salvo attacks to different targets when wielding pistols. Characters hit by your Pistol Salvo attacks do not get Booming due to Salvo penalties against you. 	{"violence": {"points": 0, "skills": {"shooting": {"points": 2}}}}
162	Untouchable	You gain an extra reaction every round. 	{}
163	Chemhead	Double the stat values affected by your Chemical Therapy. (Not Narcotics)	{"cybernetica": {"points": 0, "skills": {"chromebits": {"points": 1}}}}
164	Chrome Lizard-Brain	You gain an extra reaction that can only be used to activate a Cybernetic. 	{"cybernetica": {"points": 0, "skills": {"chromebits": {"points": 2}}}}
165	Ego Death	Anytime you receive a negative mental condition (confused, rattled, etc.) you can instead replace it with Berserked. This lasts for the duration of the original effect.	{"cybernetica": {"points": 0, "skills": {"chromebits": {"points": 2}}}}
166	The Purity of Steel	While your Cyber points are full, you raise the TN of esoteric abilities targeting you by +1. You can use your reaction to make 1 movement towards a character targeting you with such an ability. 	{"cybernetica": {"points": 0, "skills": {"chromebits": {"points": 3}}}}
168	Fire Barrage	Once per combat, for a single Action, you can fire all of your mounted drones. This does not count as their action for the turn.	{"cybernetica": {"points": 0, "skills": {"hardwired": {"points": 3}}}}
169	Kamikaze	As an action or reaction, you detonate one of your drones. The Blast radius is equal to the drones WGT, and the damage of the blast is equal to its max Health. The blast damage is not halved. 	{"cybernetica": {"points": 0, "skills": {"hardwired": {"points": 2}}}}
170	Robo Girlfriend	You gain the advanced multi-operation drone – The AMOD – and begin with 2 of its listed functions applied to it. The other functions can be purchased and installed with an hour of work. 	{"cybernetica": {"points": 0, "skills": {"hardwired": {"points": 4}}}}
142	Lucky Break	Whenever you succeed at a roll that can critically fail, you gain Xd6 profit margins, where X is the number of times you’ve attempted such rolls this session.	{}
141	Hobbyist	Put 1 skill point in each of two separate skills that currently have 0 points in them.	{}
135	Werewolf	Once per scene, as a free action, you may regenerate 1d6 Health and remove 1 condition entirely (all stacks if applicable).	{"violence": {"points": 0, "skills": {"threshold": {"points": 4}}}}
146	Stunning Demolition	Whenever you damage a target using the Detonate Keyword, that character and 1 adjacent character receive the Rattled condition. 	{}
138	Bottled Lightning	Your Initiative rolls are Lucky and receive +2 Dice. 	{}
137	Born and Raised	Choose 1 area of the city (this varies based on what type of map your game uses). All attempts to navigate, track, or otherwise traverse within this area receive Booming and +1 Dice. 	{}
160	Breathe Deep	You ignore the penalties from the first stage (3) of Toxic debuffs. 	{}
139	Chain Shocking	Whenever a target with Shocking suffers damage from the condition, if you applied it, it jumps to an additional enemy.  	{}
161	Persistent Virtue	Whenever you apply a condition that Stacks, the target receives an additional Stack. 	{}
136	Ambidextrous	Whenever you take an action that requires only one hand, one other hand can be used to perform an action for free once per turn.	{}
147	Subtle Modification	Add +2 to one or +1 to two of your Derived Stats. 	{}
167	Drone Lifter	Add your Hardwire Rating to your Equip.\n	{}
172	Map Mind	Anytime you would roll to navigate the city, you may roll Motorized (does not apply to sewer travel).	{"cybernetica": {"points": 0, "skills": {"motorized": {"points": 1}}}}
174	Modhead	You can grant bonuses to your vehicle of choice using 8 hours of work. Your pride only allows you to have 1 modded vehicle at a time. If you have 4 Motorized, you may choose 2 different bonuses. \n(round up when necessary) \n- Spd.: +50/+1\n- Agility: +2\n- Hull: +50%\n- Armor: +1\n- Cargo: x2\n- Pass.: x2\n\n	{"cybernetica": {"points": 0, "skills": {"motorized": {"points": 2}}}}
177	Split Second	While Full Diving, you can use your reaction to perform a Networked Action on another character’s turn outside the Sphere. 	{"cybernetica": {"points": 0, "skills": {"networked": {"points": 3}}}}
178	Submersion Tactics	If you are being tracked or detected while Full Diving, you can skip your next turn of action. Doing so removes both conditions.	{"cybernetica": {"points": 0, "skills": {"networked": {"points": 2}}}}
179	Security Analyst	Characters treat your Networked TN as +1 higher. You treat Characters’ Networked TNs as -1 lower. (Does not affect D-Mines, AI, and other rolls.)	{"cybernetica": {"points": 0, "skills": {"networked": {"points": 3}}}}
180	Gunnery Mind	Your Psychic Salvo gains +1 salvo. You may distribute your Psychic Salvo attacks to different targets. 	{"esoterica": {"points": 0, "skills": {"gestalt": {"points": 3}}}}
181	Mind Tracer	You may use your reaction to dodge an incoming attack; roll Gestalt, subtracting a success from the attack for each success you roll. The attack must originate from a human within your Mind Expansion range. 	{"esoterica": {"points": 0, "skills": {"gestalt": {"points": 2}}}}
182	Mind Warden	You may use your reaction to intercept a Sanity attack against another character within your Mind Expansion range. That attack resolves with you as the target. 	{"esoterica": {"points": 0, "skills": {"gestalt": {"points": 2}}}}
184	Onslaught	Once per day, you may give your Psychic Salvo the Spray trait. 	{"esoterica": {"points": 0, "skills": {"gestalt": {"points": 3}}}}
185	Break the Dream	Whenever you Push It and lose Sanity, you deal 1 Sanity damage to all characters within 30 feet of you. 	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 2}}}}
186	Dreamwire	If a character is afflicted by a malfunction as a result of a Networked roll, you can spend your reaction to roll Godhead against their Networked TN. On a success, you may apply a second Malfunction. 	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 2}}}}
187	Faithful Servant	You may select one of the Cursed Mutations and permanently apply it to your character. 	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 2}}}}
188	Man of Gods	You may select one of the Blessed Mutations and permanently apply it to your character. 	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 4}}}}
190	Church Corps	Once per day, you can perform one hour of labor, rolling mysticism and choosing one of the following: creating an orthodox censer-bell (its BP equal to successes), creating a number of Ofuda equal to your successes, or creating a Sage Bundle that lasts a number of minutes equal to your successes. 	{"esoterica": {"points": 0, "skills": {"mysticism": {"points": 2}}}}
191	Four Corners Technique	As an action, you may expend four Ofuda, throwing them each at a location within range. They erect a barrier within their perimeter that lasts for a number of minutes equal to your Mysticism rating. 	{"esoterica": {"points": 0, "skills": {"mysticism": {"points": 3}}}}
192	Old Ofuda	As an action, you can lose 1 Health and scribble your bloody ink onto paper to create a single Ofuda. 	{"esoterica": {"points": 0, "skills": {"mysticism": {"points": 1}}}}
193	Fat Stacks	Anytime you would roll upon purchasing a consumable item, you instead receive the maximum amount +1.  	{"peace": {"points": 0, "skills": {"barter": {"points": 3}}}}
194	Gang Economics	You gain 4 Slinger Goons under your personal employ. If they die, you passively recruit 1 per week (Maximum 4). They have their own living space. 	{"peace": {"points": 0, "skills": {"barter": {"points": 4}}}}
195	High Roller	Anytime you roll upon purchasing a consumable item, you may roll twice and pick one. 	{"peace": {"points": 0, "skills": {"barter": {"points": 1}}}}
231	Hoodsliding	Increase your Evasion by +1 until your next turn after fully using your Movement action. \n	{"cybernetica": {"points": 0, "skills": {"motorized": {"points": 2}}}}
175	The Salamander	You gain access to the Salamander Light Mech. You choose 1 Sala-weapon, 1 Sala-mod, and receive the Salamander’s claw for its second weapon. You are able to purchase the other items, which require 1d4 hours of labor to swap out. 	{"cybernetica": {"points": 0, "skills": {"motorized": {"points": 4}}}}
176	Breaker's Prayer	Once per day, you can roll Networked. Select any number of viable targets within range. Grant each affected target a Malfunction per the Networked rules. You may Upkeep all of these for 1 action. 	{"cybernetica": {"points": 0, "skills": {"networked": {"points": 4}}}}
183	Off Balance Assault	When you Push a Psychic Salvo, you grant it +1 damage. 	{"esoterica": {"points": 0, "skills": {"gestalt": {"points": 1}}}}
189	Proselytize	Once per day, you may roll Exposure as though it had Spray. You still only roll on the Table as though you were targeting 1 character. \n	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 3}}}}
196	I Know a Guy	Whenever you fail an Erudition check, you make a check at half the original’s TN. On a success, you know a character (contact or otherwise) that knows this information. You can go meet or contact that character to pursue more knowledge on the subject. 	{"peace": {"points": 0, "skills": {"erudition": {"points": 1}}}}
197	Spymaster	You gain 4 Rat Goons under your personal employ. If they die, you passively recruit 1 per week (Maximum 4). They have their own living space. 	{"peace": {"points": 0, "skills": {"erudition": {"points": 4}}}}
199	Strategic Genius	Once per day, you may give up to three of your turn’s actions away. Each character can only receive one action from this ability, and performs it immediately. 	{"peace": {"points": 0, "skills": {"erudition": {"points": 3}}}}
200	Fast Talker	If failing a rhetoric roll would have negative consequences, those consequences don’t take effect until this current conversation ends. 	{"peace": {"points": 0, "skills": {"rhetoric": {"points": 2}}}}
202	Indomitable Charisma	Esoteric abilities roll against your Rhetoric rating instead of their listed rating. These rolls are Booming.	{"peace": {"points": 0, "skills": {"rhetoric": {"points": 3}}}}
203	Big Pharma	Once per session, you may source up to 4 crates of pharmaceuticals or illegal narcotics. Each crate has 10 doses, and determines its value based on the type within. 	{"peace": {"points": 0, "skills": {"treatment": {"points": 4}}}}
204	Little Pharma	Once per session, you may source pharmaceuticals and illegal narcotics. You receive an instance of any substance per point of Treatment you have. Roll for doses as though they’d been purchased. 	{"peace": {"points": 0, "skills": {"treatment": {"points": 2}}}}
205	Scam Artist	Once per day, you may fake an injury involving another individual. You may roll Treatment instead of Barter to convince them to pay for your injuries. The starting amount is (Treatment Rating) profit margins, and can be modified as per the Deal rules (see barter).  	{"peace": {"points": 0, "skills": {"treatment": {"points": 1}}}}
208	Parry Parry	As a reaction, you may Feint a parry. When an opponent parries your melee attack, you can roll a Feint against that parry, reducing its successes by your Feint’s successes. 	{"violence": {"points": 0, "skills": {"assault": {"points": 2}}}}
210	Between Breaths	When you brace a rifle, you double its range instead of the normal bonus. 	{"violence": {"points": 0, "skills": {"shooting": {"points": 2}}}}
211	Frenzy Fire	For every shot that lands in a salvo, you gain a stack of Frenzy. You may expend 5 stacks of Frenzy and a full magazine to grant your next salvo attack Spray. Your Salvo rating must be greater than 1, and your MAG must be greater than your SLV. (Blast and Spray attacks only grant 1 stack; Blast and Spray weapons are not affected by this bonus.)	{"violence": {"points": 0, "skills": {"shooting": {"points": 3}}}}
212	Head Tapping	Once per scene, when a character within range has 4 or less Health, you may expend one action and one shot, rolling against their Evasion, to reduce them to 0 Health. This does not count towards your attack for the turn. 	{"violence": {"points": 0, "skills": {"shooting": {"points": 4}}}}
213	Shooter On the Ridge	You have a mysterious sniper under your employ. Once per session, you may call in fire support for the duration of one scene. For that scene, at the top of initiative, the sniper takes the shot at 1 target using your Shooting Dice Pool and a Long Rifle.	{"violence": {"points": 0, "skills": {"shooting": {"points": 4}}}}
214	Slippery	You increase your evasion by +1. 	{"violence": {"points": 0, "skills": {"shooting": {"points": 2}}}}
215	Envy Breeds Demand	Items you steal increase their base value (Before Deals) by X, where X is the former owner’s Reputation Level. Does not apply if the former owner is dead. (Applies to profit margins or spending power.)	{"violence": {"points": 0, "skills": {"subterfuge": {"points": 2}}}}
216	Jealousy Adds Value	Items you steal increase their base value (before Deals) by 20% if the previous owner is still alive.	{"violence": {"points": 0, "skills": {"subterfuge": {"points": 2}}}}
217	The New Ninjutsu	You can use your reaction to Sneak and increase your evasion by +1 until the end of your next turn. 	{"violence": {"points": 0, "skills": {"subterfuge": {"points": 2}}}}
218	Shadow of a Falling Leaf	You may roll Subterfuge when falling, reducing the health lost by 1 point for every success you roll. 	{"violence": {"points": 0, "skills": {"subterfuge": {"points": 2}}}}
219	I'm Feelin' It	While under the influence of a Narcotic (or similar substance) you raise the TN of any Esoteric ability targeting you by 1. The first time you consume a Narcotic each scene, you regain 3 Health. 	{"violence": {"points": 0, "skills": {"threshold": {"points": 1}}}}
220	More Beast than Man	While Berserked, you receive +1 armor and +1 ward. Your unarmed and improvised attacks deal +1 damage. 	{"violence": {"points": 0, "skills": {"threshold": {"points": 2}}}}
221	Pack Mule	You add +5 to your Equipment Threshold. 	{"violence": {"points": 0, "skills": {"threshold": {"points": 2}}}}
222	Protagonism	Rolls to Endure are Booming. 	{"violence": {"points": 0, "skills": {"threshold": {"points": 1}}}}
223	Applied Theoretics	Add your Treatment Rating to your Health. \n	{}
206	Beso Tóxico 	While you have more Stacks of Toxic than a target, dealing damage with a Melee Attack forces them to Endure (TN = your Toxic Stacks). If they fail, they receive 1 Toxic per Instance of Damage. 	{"violence": {"points": 0, "skills": {"assault": {"points": 1}}}}
207	Could've Gone Pro	Double your throw distance. 	{"violence": {"points": 0, "skills": {"assault": {"points": 1}}}}
233	The New World Boogie	When a target performs an Upload against you, you may use your reaction to perform an Upload against a viable target. \n\n	{"cybernetica": {"points": 0, "skills": {"networked": {"points": 3}}}}
234	All Seeing Eye	Increase your Evasion by +1 until your next turn after performing Mind Expansion. \n\n	{"esoterica": {"points": 0, "skills": {"gestalt": {"points": 2}}}}
235	Gods Help Me	Increase your Ward by +1 until your next turn after performing Exposure. \n\n	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 2}}}}
236	Shield of Death	Increase your Ward by +1 while possessed. \n\n	{"esoterica": {"points": 0, "skills": {"outerworld": {"points": 2}}}}
237	Glass Ceiling	Reduce all Retirement costs by Half.\n\n	{"peace": {"points": 0, "skills": {"barter": {"points": 2}}}}
239	Get Down!	Increase your Armor by +1 until your next turn after Performing the First Aid action.\n\n	{"peace": {"points": 0, "skills": {"treatment": {"points": 2}}}}
240	Death of a Samurai	Whenever you are Wounded, you may make a single strike at a viable target. When you suffer a Permanent Injury, you may make a Flurry or Haymaker instead. This does not use a reaction. \n\n	{"violence": {"points": 0, "skills": {"assault": {"points": 2}}}}
241	Opportunist	Whenever you perform an Opportunity Attack, you can perform a Haymaker or a Flurry instead of a single strike. \n\n	{"violence": {"points": 0, "skills": {"assault": {"points": 2}}}}
242	Punisher	If a character takes an action that targets another character, and that action isn’t a melee attack, you can use your reaction to make an Opportunity Attack against them. \n\n	{"violence": {"points": 0, "skills": {"assault": {"points": 2}}}}
243	Aggression Tactics	Submachine Guns become 1 handed and Defensive when wielded with a Shield. They no longer receive Booming from their SMG trait while wielded this way. \n\n	{"violence": {"points": 0, "skills": {"shooting": {"points": 3}}}}
244	Hell on Two Legs	Increase your Armor stat by +1 until your next turn after Bracing a Heavy Weapon. \n\n	{"violence": {"points": 0, "skills": {"shooting": {"points": 2}}}}
246	Ready for Action	While Braced, your attacks with a Rifle are Booming.  \n\n	{"violence": {"points": 0, "skills": {"shooting": {"points": 2}}}}
247	Shifting	Once per round, when an attack misses you, you may Sneak (for free!). Sneaking does not provoke Opportunity Attacks. \n\n	{"violence": {"points": 0, "skills": {"subterfuge": {"points": 3}}}}
248	Get. Up. 	When you suffer a Permanent Injury, restore your Health to full. You are still Wounded. \n\n	{"violence": {"points": 0, "skills": {"threshold": {"points": 4}}}}
232	Coarse Data Net	Increase your Ward by +1 until your next turn after performing an Upload. \n\n	{"cybernetica": {"points": 0, "skills": {"networked": {"points": 2}}}}
249	The Bomber	Increase the Blast of Grenades you throw by +1.  	{"cybernetica": {"points": 0, "skills": {"hardwired": {"points": 2}}}}
23	PIT Bull	When ramming an enemy vehicle using Motorized, you may instead PIT them. If you succeed, instead of dealing damage, reduce their current speed to 0 as they spin out of control.  	{"cybernetica": {"points": 0, "skills": {"motorized": {"points": 2}}}}
39	Rip and Tear	Once per battle, after using Insertion and dealing Sanity damage, you can use your reaction to tear your way out of their mind, dealing the same amount of sanity damage as the total salvo again in one new instance.	{"esoterica": {"points": 0, "skills": {"gestalt": {"points": 3}}}}
201	God As My Witness	Your speaking ability borders on the supernatural. Once per day, you may perform a Waking Dream, rolling Rhetoric instead of Godhead.  	{"peace": {"points": 0, "skills": {"rhetoric": {"points": 4}}}}
209	Paymaker	Your Haymakers deal +2 damage. 	{"violence": {"points": 0, "skills": {"assault": {"points": 2}}}}
171	Aston Philosophy	When you select this perk, for every odd Upgrade Level you possess, receive a Common Vehicle Modification. For every odd Upgrade Level after that, you receive a new Common Vehicle Modification. At Level 5 and beyond, you may choose Uncommons instead. 	{"cybernetica": {"points": 0, "skills": {"motorized": {"points": 2}}}}
134	The Makings Of	You receive +2 HP, +1 Permanent Injury (before going AWOL), and +2 Cyber.	{"violence": {"points": 0, "skills": {"threshold": {"points": 4}}}}
140	Flame Jester	Whenever a character loses Sanity from the Burning condition, you may use a reaction to psychotically laugh. If you do, the target’s allies within line of sight lose 1 Sanity. 	{}
60	Ghost in the Machine	As an action, you can force a phantom into a digital device you touch, causing it to malfunction. Analog devices are unaffected. The equipment’s rolls are Dooming for the remainder of the Scene. 	{"esoterica": {"points": 0, "skills": {"outerworld": {"points": 2}}}}
238	Slicky the Pete	When performing the Distract action, you may spend 1 profit margin. Doing so allows you to roll Barter instead of Rhetoric. \n\n	{"peace": {"points": 0, "skills": {"barter": {"points": 2}}}}
82	Mob Mentality	When performing Crowdwork, your rolls gain Booming.	{"peace": {"points": 0, "skills": {"rhetoric": {"points": 2}}}}
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, "firstName", "lastName", "profilePicture", "googleId", "facebookId", email, password, role, "createdAt") FROM stdin;
3	Ben	Long	\N	\N	\N	benjlong@gmail.com	$2a$10$JOizQ/JAQpX7W4LVDeSDXOnxrurm7HCmfOQLi6xFWLpDJSYfSyLWe	USER	2025-01-03 20:12:17.647
2	Ben	Long	https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=8764376486948679&height=50&width=50&ext=1738457442&hash=AbbeDijDnGgLPwyavKw387tc	\N	8764376486948679	benjlong50@gmail.com	\N	SUPERADMIN	2025-01-03 00:50:42.71
6	Reece	Ezell	https://lh3.googleusercontent.com/a/ACg8ocL_cfVllg_QqNneNPcL6Y2ouULYaFj1UfSXkK5ZKx9b005PNg=s96-c	116775148578775541060	\N	ezellreece@gmail.com	\N	ADMIN	2025-01-08 22:51:46.872
7	Matt	Duvan	\N	\N	\N	matthewduvan@yahoo.com	$2a$10$3vWDaPxMhy5dD9nmnzcMzOkaRmNkZmRiZ7SiOyL4cEgG.2EWploz.	USER	2025-01-09 06:04:14.913
8	Matthew	Heidl	https://lh3.googleusercontent.com/a/ACg8ocKmGRs00tJYhsxHronSYFNryc_2tqpC8CcM_DTc-T0vr3N9iQ=s96-c	114091160302323954852	\N	mheidl300@gmail.com	\N	USER	2025-01-09 06:04:23.2
9	Alain	Julian	https://lh3.googleusercontent.com/a/ACg8ocKDSfVg0YKll2g17e5BrkVbK1Nqn42BfVlT8bIGNe-XbxHTlA=s96-c	104807289746193525558	\N	alainjleon@gmail.com	\N	USER	2025-01-09 06:54:26.756
10	Gavin	Wade	\N	\N	\N	gvnwade@yahoo.com	$2a$10$fFDIUvuPiZzFtb3zLYAer.w6suTkpEPjpjkzSRo.cnZ29nl1hqTO2	USER	2025-01-09 07:08:35.472
11	Brandon	York	https://lh3.googleusercontent.com/a/ACg8ocKT7cNAsz80kqSu67oH8XSZGpFRVXg_1n-UWybDE7AjRYAsOw=s96-c	105315773240111443028	\N	yorkshire457@gmail.com	\N	USER	2025-01-09 09:40:54.511
12	Brandon	Mouw	\N	\N	\N	mouw.brandon@yahoo.com	$2a$10$JqkHjuK3kNoaS863JnP3ne5.DKP7hu5QFW4YcOZGH9WmFfQT9jikC	USER	2025-02-01 23:15:48.303
13	Rafael	Ortega	https://lh3.googleusercontent.com/a/ACg8ocKoYte7qv20x0LveO8Cs-7RkJeO-tqfJKyxp_1g0Myy8Wq6Yg=s96-c	106787049761960816336	\N	rafaelortega1994@gmail.com	\N	USER	2025-02-11 00:49:50.16
\.


--
-- Data for Name: Vehicle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Vehicle" (id, name, picture, description, stats, price, "characterInventoryId", "baseVehicleId", grade, rarity) FROM stdin;
7	The Salamander	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736836062/gated/wxiocj773mvr3ldqvpne.jpg", "publicId": "gated/wxiocj773mvr3ldqvpne"}	A one of a kind light mech suit, only slightly larger than a set of Power Armor. You choose one Sala- weapon to permanently equip to the suit. You also receive the Salamander’s Claw.	{"hull": 14, "size": 1, "armor": 2, "speed": 130, "weapon": 2, "agility": 8, "currentHull": 14, "currentWeapon": 1}	\N	\N	\N	1	artifact
10	Kikujo Racer	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736997971/gated/vv80ipoyej7fa7kvjkbz.jpg", "publicId": "gated/vv80ipoyej7fa7kvjkbz"}	This bike earned its fame in the summer grand prix of ‘72, where Katsuo Iruga drove the motorcycle to its absolute limits in a record setting display of man and machine.	{"hull": 8, "pass": 1, "size": 1, "armor": 1, "speed": 165, "agility": 5}	9	\N	\N	1	common
1	CV-14 Compliance Vehicle	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736828890/gated/frvsoktqptonhpwxyvew.jpg", "publicId": "gated/frvsoktqptonhpwxyvew"}	A police Aerial Vehicle; a four engined VTOL modified for combat performance. In addition to its copilot/gunner, it has capacity for 10 armed men in the back.	{"hull": 20, "pass": 11, "size": 4, "armor": 1, "cargo": 2, "speed": 155, "weapon": 2, "agility": 4, "currentHull": 20, "currentPass": 0, "currentCargo": 0, "currentWeapon": 2}	120	\N	\N	1	blackMarket
11	Langwin Wasp	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736998396/gated/wlq11djeubggnu5wywm3.jpg", "publicId": "gated/wlq11djeubggnu5wywm3"}	The peak of control, speed, and quality. A two door streetracer with outrageous specs. The standard version is slower than its racing counterpart, thanks to the standardized armor plating.	{"hull": 18, "pass": 2, "size": 2, "armor": 2, "cargo": 2, "speed": 200, "agility": 4}	30	\N	\N	1	uncommon
5	HIOV	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736836186/gated/jlue0jxy9ljqypeoh2ns.jpg", "publicId": "gated/jlue0jxy9ljqypeoh2ns"}	The Hazardous Industrial Operation Vehicle, this bipedal mech works heavy industrial jobs, such as large scale construction, mining, or salvage.	{"hull": 20, "size": 2, "armor": 2, "cargo": 2, "speed": 50, "weapon": 2, "agility": 3, "currentHull": 20, "currentCargo": 0, "currentWeapon": 2}	30	\N	\N	1	uncommon
4	Lotus M-47	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736998718/gated/hasvjldy2fbbwdjfmx0a.jpg", "publicId": "gated/hasvjldy2fbbwdjfmx0a"}	This two engine Aerial Vehicle features an open mount for its pilot, making it not unlike a hover bike. Its mobility makes it the mount of choice for high risk espionage and corporate black ops.	{"hull": 10, "pass": 1, "size": 1, "armor": 1, "cargo": 1, "speed": 210, "agility": 5}	30	\N	\N	1	uncommon
9	MG-09	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736836410/gated/nxgv9j8kz3mig3m7ha6z.jpg", "publicId": "gated/nxgv9j8kz3mig3m7ha6z"}	The MG-09, AKA Mobile Garage, is a portable storage and workspace for vehicles. Its multipurpose design makes it a mainstay amongst convoys and caravans. It can be adjusted to fit wheeled, legged, or aerial vehicles.	{"hull": 22, "pass": 2, "size": 5, "armor": 3, "cargo": 4, "speed": 100, "hangar": 4, "agility": 1}	50	\N	\N	1	uncommon
16	Trainyard Scaffer	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736998775/gated/oddvs1jam57r3kuxrxrz.jpg", "publicId": "gated/oddvs1jam57r3kuxrxrz"}	Large industrial trucks, known as scaffers, come in many varieties from many makers. Flatbeds, box trucks, cranes, and for an extra fee, armored. Its Cargo rating can be traded for more passengers or Hangar space. (1 to 1 and 10 to 1 respectively).	{"hull": 25, "pass": 3, "size": 4, "armor": 3, "cargo": 10, "speed": 80, "agility": 2}	20	\N	\N	1	common
14	Ranger Utility Truck	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736999131/gated/griqo3udvclcidua2zgq.jpg", "publicId": "gated/griqo3udvclcidua2zgq"}	The rangers used to be great in number and well respected in the early days of the cities, when the walls were unfinished. Nowadays, hardly any of ‘em remain.	{"hull": 20, "pass": 4, "size": 3, "armor": 1, "cargo": 6, "speed": 110, "agility": 2}	10	\N	\N	1	common
15	RV-2	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736999219/gated/fokw7bgn2akrmjxd3fuu.jpg", "publicId": "gated/fokw7bgn2akrmjxd3fuu"}	The open topped rover module included with the MB-17. Its intended role was that of a scout, but many crews use it as an engineering aid or a medical transport.	{"hull": 12, "pass": 3, "size": 2, "armor": 1, "cargo": 1, "speed": 120, "agility": 4}	6	\N	\N	1	common
13	Nanioko Econ Class	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736999310/gated/x4arvh5qmim3qbgsxx1v.jpg", "publicId": "gated/x4arvh5qmim3qbgsxx1v"}	A small 4 door civilian vehicle with an emphasis on cost efficacy over performance. The vehicle for a man on a budget that’s too scared to ride a bike.	{"hull": 10, "pass": 4, "size": 2, "armor": 1, "cargo": 3, "speed": 120, "agility": 3}	7	\N	\N	1	common
2	Hanzo Hayabusa II	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736828876/gated/hpq1ys2gxkpf50ip6ybu.jpg", "publicId": "gated/hpq1ys2gxkpf50ip6ybu"}	A two engine plus booster hybrid VTOL, this light AV was originally designed for advanced espionage, but occasionally finds its way into the civilian workforce.	{"hull": 10, "pass": 1, "size": 2, "armor": 1, "cargo": 2, "speed": 265, "weapon": 1, "agility": 4, "currentHull": 10, "currentPass": 0, "currentCargo": 0, "currentWeapon": 1}	60	\N	\N	1	rare
6	Ja Fui Xien Locust	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736835993/gated/cpnq25wtpk1ldfnn93zf.jpg", "publicId": "gated/cpnq25wtpk1ldfnn93zf"}	A dread bipedal menace shelved after the fires of colonial war died down. Some still exist on the market…	{"hull": 20, "size": 2, "armor": 3, "speed": 130, "weapon": 3, "agility": 7, "currentHull": 20, "currentWeapon": 3}	500	\N	\N	1	artifact
3	Basilisk MS.11	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736997806/gated/xettrav078ects9nea9e.jpg", "publicId": "gated/xettrav078ects9nea9e"}	Said to be the last thing a gangster sees when he’s gone too far. The Basilisk is a bipedal military mech adapted for extreme population control.	{"hull": 30, "pass": 1, "size": 2, "armor": 3, "cargo": 2, "speed": 70, "weapon": 4, "agility": 5, "currentHull": 30, "currentPass": 0, "currentCargo": 0, "currentWeapon": 4}	250	\N	\N	1	blackMarket
8	The Bull	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736836265/gated/h1ugs4cwtsva76fd8skk.jpg", "publicId": "gated/h1ugs4cwtsva76fd8skk"}	This massive armored truck is used to carry large amounts of high value cargo. Frequently used by the Corpos to transfer their wealth and assets from one location to the next.	{"hull": 30, "pass": 5, "size": 4, "armor": 4, "cargo": 15, "speed": 140, "weapon": 2, "agility": 2, "currentHull": 30, "currentPass": 0, "currentCargo": 0, "currentWeapon": 2}	40	\N	\N	1	rare
17	MG-09	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736836410/gated/nxgv9j8kz3mig3m7ha6z.jpg", "publicId": "gated/nxgv9j8kz3mig3m7ha6z"}	The MG-09, AKA Mobile Garage, is a portable storage and workspace for vehicles. Its multipurpose design makes it a mainstay amongst convoys and caravans. It can be adjusted to fit wheeled, legged, or aerial vehicles.	{"hull": 22, "pass": 2, "size": 5, "armor": 3, "cargo": 4, "speed": 100, "hangar": 4, "agility": 1, "currentHull": 22, "currentPass": 0, "currentCargo": 0, "currentHangar": 0}	50	6	9	1	common
12	MB-17 Travel Mode	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1737003108/gated/sbmni9m5ji269w1qybyj.jpg", "publicId": "gated/sbmni9m5ji269w1qybyj"}	A vehicle that doubles as a hideout. Primarily an industrial machine designed to coordinate large, long distance mining operations. It includes hangar space for the RV-2, or an equal amount of Size. Can only be purchased as a hideout.	{"hull": 30, "pass": 8, "size": 5, "armor": 4, "cargo": 10, "speed": 70, "hangar": 2, "agility": 1}	\N	\N	\N	1	uncommon
18	Langwin Queen	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739326439/gated/o12qztj1zmhin12zx3vm.jpg", "publicId": "gated/o12qztj1zmhin12zx3vm"}	A civilian Aerial Vehicle, this four engine VTOL primarily ferries around wealthy officials and VIPs. The interior is made for comfort, not capacity, and has one seat for a copilot.	{"hull": 12, "pass": 7, "size": 3, "armor": 1, "cargo": 2, "speed": 120, "agility": 3, "currentHull": 12, "currentPass": 0, "currentCargo": 0}	50	\N	\N	1	rare
\.


--
-- Data for Name: Weapon; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Weapon" (id, name, picture, description, stats, price, keywords, "characterInventoryId", "cyberneticId", equipped, "baseWeaponId", grade, rarity, "vehicleId") FROM stdin;
49	PDW	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735973658/gated/naz1hzdt5e5ggpi8t1qx.jpg", "publicId": "gated/naz1hzdt5e5ggpi8t1qx"}	The mainstay of any Anti-Gang Unit worth its salt. Most are ID locked to their user with their vitals linked to the station.	{"range": 20, "salvo": 5, "damage": 2, "weight": 2, "magCount": 3, "magCapacity": 16}	7	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 22}","{\\"keywordId\\": 21}"}	\N	\N	f	\N	1	common	\N
22	Unarmed	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735941454/gated/neaqjp1z31ji8qsasi4j.jpg", "publicId": "gated/neaqjp1z31ji8qsasi4j"}	God’s greatest gift to mankind.	{"damage": 1}	0	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 5}","{\\"keywordId\\": 6}","{\\"keywordId\\": 2}"}	\N	\N	f	\N	1	common	\N
82	Knife	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736408552/gated/raac6n6ajniwsqnlwxbv.jpg", "publicId": "gated/raac6n6ajniwsqnlwxbv"}	Plain and simple, perfect for first timers and veterans alike. Perhaps its greatest benefit is its small size and ease of hiding.	{"damage": 3, "flurry": 3, "weight": 1}	1	{"{\\"keywordId\\": 2}","{\\"keywordId\\": 3}","{\\"keywordId\\": 1}"}	\N	\N	f	\N	1	common	\N
88	Dyna-Axe	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738894717/gated/fyirr0saaygwfxyrbwng.jpg", "publicId": "gated/fyirr0saaygwfxyrbwng"}	This axe is equipped with directional charges in the blade designed to detonate at will.	{"damage": 6, "flurry": 2, "weight": 3, "magCount": 3, "magCapacity": 1}	8	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 2}"}	\N	\N	f	\N	1	common	\N
23	Breacher	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736057704/gated/dm5afmycafovkiqgwwdj.jpg", "publicId": "gated/dm5afmycafovkiqgwwdj"}	A police shotgun designed to enter enclosed areas while swiftly delivering zones of lethality.	{"range": 20, "salvo": 3, "damage": 5, "weight": 3, "magCount": 2, "magCapacity": 8}	7	{"{\\"keywordId\\": 7}","{\\"keywordId\\": 8}"}	\N	\N	f	\N	1	common	\N
51	Ignition Greatsword	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735975849/gated/n6letag5xgqvlytta5kd.jpg", "publicId": "gated/n6letag5xgqvlytta5kd"}	An electrochemical weapon that creates a cloud of bound incendiary particles following the blade. It makes you feel really cool.	{"damage": 6, "flurry": 3, "weight": 5, "magCount": 2, "magCapacity": 3}	14	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 8}","{\\"value\\": 2, \\"keywordId\\": 32}"}	\N	\N	f	\N	1	uncommon	\N
25	Ranger Smoothbore	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735942038/gated/djkendpcalua4g997zyg.jpg", "publicId": "gated/djkendpcalua4g997zyg"}	The weapon of choice for hired outriders, those lonesome souls that patrol the Wastes Between.	{"range": 20, "salvo": 2, "damage": 5, "weight": 3, "magCount": 2, "magCapacity": 8}	3	{"{\\"keywordId\\": 7}","{\\"keywordId\\": 8}","{\\"keywordId\\": 33}"}	\N	\N	f	\N	1	common	\N
85	Scour	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738968295/gated/xxvoqktep18kb7ynivio.jpg", "publicId": "gated/xxvoqktep18kb7ynivio"}	Modified industrial equipment that sprays a phosphoric substance known as Crimson. It ignites organic material.	{"range": 15, "salvo": 1, "damage": 5, "magCount": 3, "magCapacity": 3}	7	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 24}","{\\"keywordId\\": 26}","{\\"value\\": 2, \\"keywordId\\": 36}"}	\N	\N	f	\N	1	common	\N
50	Needle Gun	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735973707/gated/ccbvkz9ds29l9326pa8m.jpg", "publicId": "gated/ccbvkz9ds29l9326pa8m"}	A weapon commonly used by Royals agents. Magnets silently accelerate fragile needles for quiet operations.	{"range": 15, "salvo": 6, "damage": 2, "weight": 2, "magCount": 2, "magCapacity": 25}	10	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 21}","{\\"keywordId\\": 22}","{\\"keywordId\\": 40}","{\\"keywordId\\": 44}"}	\N	\N	f	\N	1	uncommon	\N
86	Shellgun	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738968396/gated/uwhiofkwuxw4fjv1ku5b.jpg", "publicId": "gated/uwhiofkwuxw4fjv1ku5b"}	A simple recoilless rifle designed during the rebellious period shortly after arrival on Nova Viridian.	{"range": 50, "salvo": 1, "damage": 10, "weight": 5, "magCount": 3, "magCapacity": 1}	18	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 28}","{\\"keywordId\\": 24}","{\\"value\\": 2, \\"keywordId\\": 31}"}	\N	\N	f	\N	1	uncommon	\N
36	Kairos LMG	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735961732/gated/yks1rmt4cojymbava0sc.jpg", "publicId": "gated/yks1rmt4cojymbava0sc"}	A Noble commissioned weapon to be elegantly fearsome. Many streetgangs deliberately deface theirs.	{"range": 50, "salvo": 6, "damage": 4, "weight": 5, "magCount": 2, "magCapacity": 20}	18	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 22}","{\\"keywordId\\": 24}"}	\N	\N	f	\N	1	uncommon	\N
83	FDL Trencher	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738966711/gated/d4ebicvllhyrxmdpu8lv.jpg", "publicId": "gated/d4ebicvllhyrxmdpu8lv"}	A Federal design with accompanying tungsten tipped high density rounds. A pricy no nonsense kind of weapon.	{"range": 60, "salvo": 3, "damage": 4, "weight": 3, "magCount": 2, "magCapacity": 14}	11	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 50}","{\\"keywordId\\": 53}"}	\N	\N	f	\N	1	uncommon	\N
72	Long Rifle	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736403254/gated/lgjhdxuien9kpx8e9j7p.jpg", "publicId": "gated/lgjhdxuien9kpx8e9j7p"}	A revolutionist’s weapon; most remain from mass production centuries ago. Their age speaks volumes. 	{"range": 100, "salvo": 1, "damage": 7, "weight": 2, "magCount": 4, "magCapacity": 3}	4	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 10}","{\\"keywordId\\": 33}","{\\"keywordId\\": 50}"}	\N	\N	f	\N	1	common	\N
74	Psychic Salvo	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736405403/gated/uuntwznrh3xctpgslnqy.jpg", "publicId": "gated/uuntwznrh3xctpgslnqy"}	Break down the barriers between mind and many. Reach inside and spill the contents forth.	{"salvo": 2, "damage": 2}	\N	{"{\\"keywordId\\": 2}","{\\"keywordId\\": 51}"}	\N	\N	f	\N	1	common	\N
73	Pokgun	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736405361/gated/w0imfooihv48pru9coxm.jpg", "publicId": "gated/w0imfooihv48pru9coxm"}	A pocket gun, a small two barreled breech loaded last resort. It doesn’t pack a punch, but it comes as a shock.	{"range": 8, "salvo": 2, "damage": 2, "weight": 1, "magCount": 5, "magCapacity": 2}	1	{"{\\"keywordId\\": 3}","{\\"keywordId\\": 6}","{\\"keywordId\\": 9}","{\\"keywordId\\": 2}"}	\N	\N	f	\N	1	common	\N
67	Cyber Blade	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739386689/gated/xihmhi4hiquph7c4ijjh.jpg", "publicId": "gated/xihmhi4hiquph7c4ijjh"}	\N	{"damage": 5, "flurry": 2}	\N	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 3}","{\\"keywordId\\": 4}","{\\"keywordId\\": 20}","{\\"keywordId\\": 40}","{\\"keywordId\\": 2}"}	\N	10	f	\N	1	uncommon	\N
80	Dog Gun	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736407826/gated/ibtxf0wu6aad5gbfsw51.jpg", "publicId": "gated/ibtxf0wu6aad5gbfsw51"}	A poor man's PDW; dog guns are so called since their users are a cut above dogs in the eyes of superior gangs.	{"range": 20, "salvo": 4, "damage": 2, "weight": 2, "magCount": 3, "magCapacity": 15, "currentMagCount": 2, "currentAmmoCount": 15}	4	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 21}","{\\"keywordId\\": 22}"}	\N	\N	f	\N	1	common	\N
60	Electro-Fists	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735933456/gated/b2pd4zpvib5nnkdshcxx.jpg", "publicId": "gated/b2pd4zpvib5nnkdshcxx"}	\N	{"damage": 2}	\N	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 5}","{\\"keywordId\\": 20}","{\\"keywordId\\": 2}"}	\N	11	f	\N	1	uncommon	\N
77	Slug Gun	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736406934/gated/ah15h30byrzp7qre0gcj.jpg", "publicId": "gated/ah15h30byrzp7qre0gcj"}	A single barreled pipegun found in any junky’s garage. Simple, but effective and very cheap.	{"range": 20, "salvo": 1, "damage": 5, "weight": 3, "magCount": 8, "magCapacity": 1}	2	{"{\\"keywordId\\": 7}","{\\"keywordId\\": 8}","{\\"keywordId\\": 11}"}	\N	\N	f	\N	1	common	\N
78	Shredder	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736407142/gated/ku6jrz1acvgnieyntz9e.jpg", "publicId": "gated/ku6jrz1acvgnieyntz9e"}	A flechette pistol designed in service of the Old Federal Navy. Now, it’s been bastardized to street slaughter.	{"range": 10, "salvo": 2, "damage": 3, "weight": 2, "magCount": 3, "magCapacity": 3}	3	{"{\\"keywordId\\": 7}","{\\"keywordId\\": 9}","{\\"keywordId\\": 2}","{\\"value\\": 1, \\"keywordId\\": 52}"}	\N	\N	f	\N	1	common	\N
75	Ripper	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736405643/gated/kgc7kg8y4pr2uy4v9yge.jpg", "publicId": "gated/kgc7kg8y4pr2uy4v9yge"}	Another slang term for a cheap automatic pistol. Oftentimes, they’re just modded semi-autos turned into machineguns.	{"range": 15, "salvo": 4, "damage": 2, "weight": 1, "magCount": 3, "magCapacity": 12}	2	{"{\\"keywordId\\": 9}","{\\"keywordId\\": 21}","{\\"keywordId\\": 37}","{\\"keywordId\\": 2}"}	\N	\N	f	\N	1	common	\N
76	Scooner	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736406688/gated/eqrmkyndfkbokega2dmy.jpg", "publicId": "gated/eqrmkyndfkbokega2dmy"}	The ubiquitous slang meaning a semi-automatic handgun of private slum make. There are many varieties.	{"range": 15, "salvo": 3, "damage": 2, "weight": 1, "magCount": 3, "magCapacity": 8}	2	{"{\\"keywordId\\": 2}","{\\"keywordId\\": 9}"}	\N	\N	f	\N	1	common	\N
81	Gorrig Suppressor	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736408407/gated/unrqqwd2rxxplj7juukr.jpg", "publicId": "gated/unrqqwd2rxxplj7juukr"}	A grenade launcher that can be individually loaded with the ammo types listed later in the grenade section.	{"range": 30, "salvo": 3, "weight": 3, "magCapacity": 4}	15	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 24}","{\\"keywordId\\": 39}"}	\N	\N	f	\N	1	uncommon	\N
90	Pneuma-Hammer	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1737000059/gated/spkqfu9la0gfpk1jygyz.jpg", "publicId": "gated/spkqfu9la0gfpk1jygyz"}	Designed to create secondary impacts on hit to maximize traumatic stress injuries.	{"damage": 4, "flurry": 3, "weight": 3, "magCount": 2, "magCapacity": 2}	6	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 2}"}	\N	\N	f	\N	1	common	\N
91	Therma-Blade	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738899246/gated/zw4dr3rztt9noqqc8hhy.png", "publicId": "gated/zw4dr3rztt9noqqc8hhy"}	A super heated saber powered by Viridian Cells, a new type of energy storage discovered on No-V.	{"damage": 3, "flurry": 4, "magCount": 3, "magCapacity": 2}	8	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 2}"}	\N	\N	f	\N	1	common	\N
100	PR-88	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738902073/gated/aczrz28fsj6cseilcrm6.jpg", "publicId": "gated/aczrz28fsj6cseilcrm6"}	A Corpo design that proved to be a fast seller amongst all factions, this man-portable railgun punches through nearly anything.	{"range": 100, "salvo": 1, "damage": 10, "weight": 4, "magCount": 4, "magCapacity": 1}	24	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 10}","{\\"keywordId\\": 58}","{\\"keywordId\\": 74}"}	\N	\N	f	\N	1	rare	\N
101	MOD-Rifle	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738967767/gated/qecfpmvuig5cn2g5twvq.jpg", "publicId": "gated/qecfpmvuig5cn2g5twvq"}	Old Federal standard issue; the MOD was an adaptive combat tool tailorable to any combat scenario.	{"range": 40, "salvo": 4, "damage": 3, "weight": 3, "magCount": 2, "magCapacity": 18}	17	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 50}","{\\"keywordId\\": 77}"}	\N	\N	f	\N	1	rare	\N
96	Burner	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738803999/gated/yvwpuaff2da5ms0rb2ez.jpg", "publicId": "gated/yvwpuaff2da5ms0rb2ez"}	A surprisingly advanced weapon often found in the Industrial Pits. These rudimentary chem throwers bely their deadliness.	{"range": 10, "salvo": 1, "damage": 3, "weight": 1, "magCount": 3, "magCapacity": 1}	2	{"{\\"keywordId\\": 26}","{\\"keywordId\\": 36}","{\\"keywordId\\": 2}","{\\"keywordId\\": 73}"}	\N	\N	f	\N	1	common	\N
105	Hornet	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738894446/gated/vnislyozbjkffesooy4t.jpg", "publicId": "gated/vnislyozbjkffesooy4t"}	A knife designed to ensure a lethal end. Blasts the wound with pressurized gas to cause extreme damage.	{"damage": 3, "flurry": 3, "weight": 1, "magCount": 3, "magCapacity": 1}	3	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 2}","{\\"keywordId\\": 68}"}	\N	\N	f	\N	1	common	\N
89	Improvised Weapon	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738894859/gated/tnjrfkscyoloi5rgtzaf.jpg", "publicId": "gated/tnjrfkscyoloi5rgtzaf"}	Whether by heat of the moment or sentimental ownership, anything can be a weapon.	{"damage": 3, "flurry": 3, "weight": 1}	0	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 6}","{\\"keywordId\\": 2}"}	\N	\N	f	\N	1	common	\N
107	Last Calls	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738895878/gated/dbfbdl5wlygg4kedrefj.jpg", "publicId": "gated/dbfbdl5wlygg4kedrefj"}	Federally designed emergency weapons, these dual gauntlets were used by trenchers dry on ammo.	{"damage": 2, "weight": 1}	1	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 5}","{\\"keywordId\\": 2}"}	\N	\N	f	\N	1	common	\N
98	Cannonara	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738804114/gated/gzu653xexm6l5stupri8.jpg", "publicId": "gated/gzu653xexm6l5stupri8"}	Book of Vengeance, Chapter 3 Verse 14: And let them suffer the justice of the righteous over seven days and seven nights.	{"range": 20, "salvo": 4, "damage": 5, "weight": 4, "magCount": 2, "magCapacity": 12}	18	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 75}"}	\N	\N	f	\N	1	uncommon	\N
95	E-Kit Launcher	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738966593/gated/ajwfqiregsud6uqfgf1i.jpg", "publicId": "gated/ajwfqiregsud6uqfgf1i"}	A staple of AV pilots of Royals forces across No-V. A robust device that adjusts grenades for launch.	{"range": 20, "salvo": 1, "weight": 1, "magCapacity": 1}	3	{"{\\"keywordId\\": 2}","{\\"keywordId\\": 73}","{\\"keywordId\\": 39}"}	\N	\N	f	\N	1	uncommon	\N
93	Barometric Maul	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738892838/gated/leu8dkszy84hjxnvtayh.jpg", "publicId": "gated/leu8dkszy84hjxnvtayh"}	Can alter local pressure within its strike zone, causing internal bleeding and muscular damage.	{"damage": 8, "flurry": 2, "weight": 5, "magCount": 2, "magCapacity": 2, "currentMagCount": 1, "currentAmmoCount": 2}	14	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 8}","{\\"value\\": 2, \\"keywordId\\": 30}"}	\N	\N	f	\N	1	uncommon	\N
99	Chaff Gun	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738966429/gated/rhyuuxp4mrzwnywb7cqw.jpg", "publicId": "gated/rhyuuxp4mrzwnywb7cqw"}	An ingenious design straight outta scav turf. Fires airbursting electro-chaff to confuse and disturb targets.	{"range": 20, "salvo": 2, "damage": 3, "weight": 3, "magCount": 2, "magCapacity": 6}	5	{"{\\"keywordId\\": 7}","{\\"keywordId\\": 8}","{\\"keywordId\\": 63}"}	\N	\N	f	\N	1	common	\N
117	Jongxi mk.998	""	An industrial powerclaw designed to grip and hoist materials. As it so happens, it can in fact grip things too far.	{"range": 3, "damage": 12, "flurry": 1}	9	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 41}","{\\"keywordId\\": 82}"}	\N	\N	f	\N	1	common	\N
116	Gorrig ART	""	Officially declared as a riot suppression tool, the MGL-60 sprays out a bombardment of situational munitions.	{"range": 30, "salvo": 6, "magCount": 2, "magCapacity": 18}	10	{"{\\"keywordId\\": 39}","{\\"keywordId\\": 82}"}	\N	\N	f	\N	1	common	\N
118	Kairos AC-12	""	A mounted autocannon that can deal with a variety of targets. A utilitarian solution to armored and soft targets.	{"range": 50, "salvo": 3, "damage": 6, "magCount": 2, "magCapacity": 30}	10	{"{\\"keywordId\\": 80}","{\\"keywordId\\": 82}","{\\"keywordId\\": 78}"}	\N	\N	f	\N	1	common	\N
119	MAIW .50	""	The Mobile Anti-Infantry Weapon. Sprays out airburst detonating flechette munitions.	{"range": 40, "salvo": 10, "damage": 4, "magCount": 1, "magCapacity": 150}	80	{"{\\"keywordId\\": 82}","{\\"keywordId\\": 26}","{\\"value\\": 2, \\"keywordId\\": 22}"}	\N	\N	f	\N	1	common	\N
120	Nano-Combi (A)	""	A police weapon that has two fire profiles (A/B), based on the combined weaponry in its linked systems.	{"range": 50, "salvo": 8, "damage": 5, "magCount": 3, "magCapacity": 50}	50	{"{\\"keywordId\\": 82}","{\\"keywordId\\": 80}","{\\"value\\": 2, \\"keywordId\\": 22}"}	\N	\N	f	\N	1	common	\N
121	Nano-Combi (B)	""	A police weapon that has two fire profiles (A/B), based on the combined weaponry in its linked systems.	{"range": 50, "salvo": 2, "damage": 10, "magCount": 3, "magCapacity": 50}	50	{"{\\"keywordId\\": 31}","{\\"value\\": 10, \\"keywordId\\": 66}","{\\"keywordId\\": 80}","{\\"keywordId\\": 82}"}	\N	\N	f	\N	1	common	\N
122	Salamander’s Claw	""	This advanced power claw links to the user through neuroconnectors. In addition to its melee function, it can be used to scale vertical walls at half the suit’s agility rating.	{"range": 2, "damage": 8, "flurry": 1}	\N	{"{\\"keywordId\\": 81}","{\\"keywordId\\": 82}","{\\"keywordId\\": 1}","{\\"keywordId\\": 41}"}	\N	\N	f	\N	1	common	\N
111	Retainer’s Twinblade	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738898687/gated/kdqzaajsdbhvmcrm67fo.png", "publicId": "gated/kdqzaajsdbhvmcrm67fo"}	The Raizen-Kyoku Nobility are renowned for their skilled retainers. These weapons let them dance amidst deadly encounters.	{"damage": 4, "flurry": 4, "weight": 3}	18	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 8}","{\\"keywordId\\": 59}"}	\N	\N	f	\N	1	uncommon	\N
109	Spiral Spear	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738899027/gated/tqh9f8kqjeatnz05iw5v.png", "publicId": "gated/tqh9f8kqjeatnz05iw5v"}	The free floating grip allows this spear to spin in its wielder’s hand.	{"range": 2, "damage": 4, "flurry": 2, "weight": 2}	2	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 41}","{\\"keywordId\\": 2}","{\\"keywordId\\": 69}"}	\N	\N	f	\N	1	common	\N
115	Pilebunker	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738896453/gated/iegljykw3jaxh3zqvnr9.jpg", "publicId": "gated/iegljykw3jaxh3zqvnr9"}	An explosive charge allows the user to blast this spear forth and demolish its target.	{"range": 2, "damage": 7, "flurry": 2, "weight": 5, "magCount": 4, "magCapacity": 1}	13	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 8}","{\\"keywordId\\": 41}","{\\"keywordId\\": 61}","{\\"keywordId\\": 69}"}	\N	\N	f	\N	1	common	\N
113	Twin Konami - (Split)	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738893889/gated/xzqkdawuczorwgdnn2nv.jpg", "publicId": "gated/xzqkdawuczorwgdnn2nv"}	Advanced dual energy axes that can temporarily link together to unleash their combined power.	{"damage": 2, "flurry": 6, "weight": 5, "magCount": 2, "magCapacity": 1}	17	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 8}","{\\"keywordId\\": 76}"}	\N	\N	f	\N	1	rare	\N
110	Turbine Kanabo	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738894228/gated/k8zgxqjo3htb79mecgab.jpg", "publicId": "gated/k8zgxqjo3htb79mecgab"}	Church Enforcers are armed with weapons to make the sinner bow, by choice or consequence.	{"damage": 4, "flurry": 4, "weight": 5, "magCount": 4, "magCapacity": 2}	15	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 8}","{\\"keywordId\\": 67}"}	\N	\N	f	\N	1	uncommon	\N
79	Crusader	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736407510/gated/fri8jdo3urvhwn85wj1r.jpg", "publicId": "gated/fri8jdo3urvhwn85wj1r"}	El-Shaddaian zealots were bestowed a weapon that matched their passion. A gun that spews a litany of bullets.	{"range": 30, "salvo": 5, "damage": 3, "weight": 3, "magCount": 2, "magCapacity": 21}	12	{"{\\"keywordId\\": 8}","{\\"value\\": 1, \\"keywordId\\": 22}","{\\"keywordId\\": 50}"}	\N	\N	f	\N	1	uncommon	\N
104	Beam Cannon	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736496361/gated/palp8rgdj2eis50vx0mh.jpg", "publicId": "gated/palp8rgdj2eis50vx0mh"}	A high output energy weapon that fires a beam of accelerated plasma through multiple targets.	{"range": 50, "salvo": 1, "damage": 5, "weight": 6, "magCount": 3, "magCapacity": 1}	32	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 10}","{\\"keywordId\\": 24}","{\\"keywordId\\": 58}","{\\"keywordId\\": 64}"}	\N	\N	f	\N	1	blackMarket	\N
123	Sala-Burst Rifle	""	This magnetic slug slinger hurls broadheads designed to kill a target even without breaking armor.	{"range": 45, "salvo": 6, "damage": 2, "magCount": 3, "magCapacity": 16}	\N	{"{\\"keywordId\\": 53}","{\\"value\\": 1, \\"keywordId\\": 22}","{\\"keywordId\\": 82}"}	\N	\N	f	\N	1	common	\N
124	Sala-Photon Lance	""	This weapon traps a field of high temperature photons capable of melting through most materials.	{"range": 4, "damage": 10, "flurry": 1, "magCount": 5, "magCapacity": 1}	\N	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 41}","{\\"keywordId\\": 82}"}	\N	\N	f	\N	1	common	\N
125	Sala-Pulse Gun	""	The Pulse gun funnels the salamander’s advanced reactor to fire electromagnetic blasts that fry other electronics.	{"range": 20, "salvo": 1, "damage": 8, "magCount": 3, "magCapacity": 3}	\N	{"{\\"keywordId\\": 31}","{\\"keywordId\\": 63}","{\\"keywordId\\": 82}"}	\N	\N	f	\N	1	common	\N
137	Pulse Mine	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738968181/gated/irbwwuuc1vnrywilwmzo.jpg", "publicId": "gated/irbwwuuc1vnrywilwmzo"}	Electromagnetic energies that are (mostly) unharmful to humans. Drones and turrets (and similar tech) in the blast are shut down, requiring a reload to re-engage. Characters struck receive dooming on Cybernetica Rolls until the end of your next turn.	{}	3	{"{\\"keywordId\\": 3}","{\\"value\\": 1, \\"keywordId\\": 31}","{\\"keywordId\\": 37}","{\\"keywordId\\": 86}"}	\N	\N	f	\N	1	uncommon	\N
131	Fragmentation Mine	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738967158/gated/ii2n42xymbgf9rffnxou.jpg", "publicId": "gated/ii2n42xymbgf9rffnxou"}	Shrapnel surrounding some sort of explosive.	{"damage": 8, "weight": 0.5}	2	{"{\\"keywordId\\": 3}","{\\"value\\": 1, \\"keywordId\\": 31}","{\\"keywordId\\": 37}","{\\"value\\": 1, \\"keywordId\\": 52}","{\\"keywordId\\": 86}"}	\N	\N	f	\N	1	uncommon	\N
133	Incendiary Mine	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738967434/gated/gvccfet0tmcbbz2sdqny.jpg", "publicId": "gated/gvccfet0tmcbbz2sdqny"}	Fuel and fire baby. Though the nice ones are organo-burning chems.	{"damage": 4, "weight": 0.5}	1	{"{\\"keywordId\\": 3}","{\\"value\\": 1, \\"keywordId\\": 31}","{\\"value\\": 2, \\"keywordId\\": 36}","{\\"keywordId\\": 37}","{\\"keywordId\\": 85}"}	\N	\N	f	\N	1	common	\N
132	Incendiary Grenade	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738967252/gated/awrglrpcxfozbufe6ezs.jpg", "publicId": "gated/awrglrpcxfozbufe6ezs"}	Fuel and fire baby. Though the nice ones are organo-burning chems.	{"damage": 2, "weight": 0.5}	1	{"{\\"value\\": 1, \\"keywordId\\": 31}","{\\"value\\": 2, \\"keywordId\\": 36}","{\\"keywordId\\": 37}","{\\"keywordId\\": 85}"}	\N	\N	f	\N	1	common	\N
139	Gutteral Shockwave	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739055077/gated/kumodmjgdfwe918wjwbv.jpg", "publicId": "gated/kumodmjgdfwe918wjwbv"}	\N	{"damage": 2}	\N	{"{\\"keywordId\\": 26}"}	\N	69	f	\N	1	uncommon	\N
141	Honorguard Blitzer	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738991527/gated/byijnk3mpz3eqpakkiro.jpg", "publicId": "gated/byijnk3mpz3eqpakkiro"}	\N	{"salvo": 1, "damage": 5, "magCount": 3, "magCapacity": 1}	\N	{"{\\"keywordId\\": 3}","{\\"keywordId\\": 24}","{\\"value\\": 20, \\"keywordId\\": 26}"}	\N	77	f	\N	1	uncommon	\N
129	Lion’s Claw	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738980130/gated/kkhha11bllitzffzpqh0.jpg", "publicId": "gated/kkhha11bllitzffzpqh0"}	\N	{"damage": 5, "flurry": 1}	\N	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 3}","{\\"keywordId\\": 20}"}	\N	37	f	\N	1	uncommon	\N
143	Psychic Barrage	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738992256/gated/cy7iczilbev0tlml4mqy.jpg", "publicId": "gated/cy7iczilbev0tlml4mqy"}	Break down the barriers between mind and many. Reach inside and spill the contents forth.	{"salvo": 2, "damage": 2}	0	{"{\\"keywordId\\": 26}","{\\"keywordId\\": 2}","{\\"keywordId\\": 51}"}	\N	78	f	\N	1	blackMarket	\N
126	SP-919	""	A devastating and rare weapon. Its ripping plasma blasts sound like rolling thunder when heard from faraway.	{"range": 50, "salvo": 10, "damage": 6, "magCount": 2, "magCapacity": 50}	100	{"{\\"value\\": 3, \\"keywordId\\": 22}","{\\"keywordId\\": 26}","{\\"keywordId\\": 82}"}	\N	\N	f	\N	1	common	\N
127	XLR-77	""	One of the most advanced weapons ever created, this mounted railgun is a dealer of pure death.	{"range": 1000, "salvo": 1, "damage": 20, "magCount": 11, "magCapacity": 1}	150	{"{\\"keywordId\\": 10}","{\\"value\\": 2, \\"keywordId\\": 31}","{\\"keywordId\\": 58}","{\\"keywordId\\": 82}"}	\N	\N	f	\N	1	common	\N
134	Smoke Grenade	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738968639/gated/oliyumr3gpbjywnjwk8w.jpg", "publicId": "gated/oliyumr3gpbjywnjwk8w"}	Low thermal chemical reactives. Baby’s first anarchist’s cookbook. Creates visual obstruction. Blast cloud remains for 1d6 rounds unless dispersed. Not an Attack.	{}	1	{"{\\"value\\": 1, \\"keywordId\\": 31}","{\\"keywordId\\": 37}","{\\"keywordId\\": 85}","{\\"keywordId\\": 87}"}	\N	\N	f	\N	1	common	\N
135	Smoke Mine	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738968700/gated/whpcycfe5m3z4ssvtb2m.jpg", "publicId": "gated/whpcycfe5m3z4ssvtb2m"}	Low thermal chemical reactives. Baby’s first anarchist’s cookbook. Creates visual obstruction. Blast cloud remains for 1d6 rounds unless dispersed. Not an Attack.	{"damage": 2}	1	{"{\\"keywordId\\": 3}","{\\"value\\": 1, \\"keywordId\\": 31}","{\\"keywordId\\": 37}","{\\"keywordId\\": 86}","{\\"keywordId\\": 87}"}	\N	\N	f	\N	1	common	\N
157	The Rat King's Pioneer	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738726022/gated/nmixhmiscwabvtendh80.jpg", "publicId": "gated/nmixhmiscwabvtendh80"}	At first glance a grotesquely modified pioneer. But  once wielded, eldritch voices from the deep places of the city beckon the user to swear an unholy pact of servitude to the Rat King. You may hold the pistol, but are you actually the one controlling it? Best not reject the pact and find out.	{"range": 30, "salvo": 2, "damage": 2, "weight": 1, "magCount": 3, "magCapacity": 4, "currentMagCount": 2, "currentAmmoCount": 4}	0	{"{\\"keywordId\\": 9}","{\\"keywordId\\": 10}","{\\"keywordId\\": 11}","{\\"keywordId\\": 2}"}	6	\N	f	24	2	rare	\N
150	Ranger Smoothbore	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735942038/gated/djkendpcalua4g997zyg.jpg", "publicId": "gated/djkendpcalua4g997zyg"}	The weapon of choice for hired outriders, those lonesome souls that patrol the Wastes Between.	{"range": 20, "salvo": 2, "damage": 5, "weight": 3, "magCount": 2, "magCapacity": 8, "currentMagCount": 1, "currentAmmoCount": 8}	3	{"{\\"keywordId\\": 7}","{\\"keywordId\\": 8}","{\\"keywordId\\": 33}"}	6	\N	f	25	1	common	\N
158	Mazer Beam Cannon - Charge 1	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735965244/gated/twskj0rcgtgwrvmabwug.jpg", "publicId": "gated/twskj0rcgtgwrvmabwug"}	\N	{"range": 15, "salvo": 2, "damage": 6}	\N	{"{\\"keywordId\\": 9}","{\\"keywordId\\": 20}","{\\"keywordId\\": 2}"}	6	95	t	69	1	artifact	\N
155	Crusader	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736407510/gated/fri8jdo3urvhwn85wj1r.jpg", "publicId": "gated/fri8jdo3urvhwn85wj1r"}	El-Shaddaian zealots were bestowed a weapon that matched their passion. A gun that spews a litany of bullets.	{"range": 30, "salvo": 5, "damage": 3, "weight": 3, "magCount": 2, "magCapacity": 21, "currentMagCount": 1, "currentAmmoCount": 13}	12	{"{\\"keywordId\\": 8}","{\\"value\\": 1, \\"keywordId\\": 22}","{\\"keywordId\\": 50}"}	6	\N	t	79	1	uncommon	\N
97	Needle Pistol	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736999503/gated/y3slelwr780feuepmgcp.jpg", "publicId": "gated/y3slelwr780feuepmgcp"}	A concealable weapon famously once used to assassinate a Deacon.	{"range": 15, "salvo": 3, "damage": 2, "weight": 1, "magCount": 3, "magCapacity": 6}	7	{"{\\"keywordId\\": 9}","{\\"keywordId\\": 40}","{\\"keywordId\\": 44}","{\\"keywordId\\": 2}"}	\N	\N	f	\N	1	uncommon	\N
140	Bomber Shellgun	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738980819/gated/f1r9r622emprslapiy4u.jpg", "publicId": "gated/f1r9r622emprslapiy4u"}	\N	{"range": 50, "salvo": 1, "damage": 6, "magCount": 3, "magCapacity": 1}	\N	{"{\\"keywordId\\": 24}","{\\"value\\": 1, \\"keywordId\\": 31}","{\\"keywordId\\": 38}","{\\"keywordId\\": 2}"}	\N	75	f	\N	1	uncommon	\N
156	Long Rifle	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736403254/gated/lgjhdxuien9kpx8e9j7p.jpg", "publicId": "gated/lgjhdxuien9kpx8e9j7p"}	A revolutionist’s weapon; most remain from mass production centuries ago. Their age speaks volumes. 	{"range": 100, "salvo": 1, "damage": 7, "weight": 2, "magCount": 4, "magCapacity": 3, "currentMagCount": 3, "currentAmmoCount": 3}	4	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 10}","{\\"keywordId\\": 33}","{\\"keywordId\\": 50}","{\\"value\\": 1, \\"keywordId\\": 52}"}	6	\N	t	72	2	common	\N
128	APD-10	""	Mounted onto the Locust, this weapon was responsible for the deaths of tens of thousands of sappers, as recorded by its onboard metrics.	{"salvo": 1, "damage": 16, "magCount": 1, "magCapacity": 5}	30	{"{\\"value\\": 4, \\"keywordId\\": 31}","{\\"value\\": 4, \\"keywordId\\": 52}","{\\"keywordId\\": 62}","{\\"keywordId\\": 82}"}	\N	\N	f	\N	1	common	\N
165	Ripper	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736405643/gated/kgc7kg8y4pr2uy4v9yge.jpg", "publicId": "gated/kgc7kg8y4pr2uy4v9yge"}	Another slang term for a cheap automatic pistol. Oftentimes, they’re just modded semi-autos turned into machineguns.	{"range": 15, "salvo": 4, "damage": 2, "weight": 1, "magCount": 3, "magCapacity": 12, "currentMagCount": 3, "currentAmmoCount": 12}	2	{"{\\"keywordId\\": 9}","{\\"keywordId\\": 21}","{\\"keywordId\\": 37}","{\\"keywordId\\": 2}"}	1	\N	t	75	1	common	\N
163	Lion’s Claw	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738980130/gated/kkhha11bllitzffzpqh0.jpg", "publicId": "gated/kkhha11bllitzffzpqh0"}	\N	{"damage": 5, "flurry": 1}	\N	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 3}","{\\"keywordId\\": 20}"}	1	96	t	129	1	uncommon	\N
164	Cyber Blade	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739386689/gated/xihmhi4hiquph7c4ijjh.jpg", "publicId": "gated/xihmhi4hiquph7c4ijjh"}	\N	{"damage": 5, "flurry": 2}	\N	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 3}","{\\"keywordId\\": 4}","{\\"keywordId\\": 20}","{\\"keywordId\\": 40}","{\\"keywordId\\": 2}"}	1	97	t	67	1	uncommon	\N
24	Pioneer	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735941974/gated/fpntbwmc4ywekyg5vja9.jpg", "publicId": "gated/fpntbwmc4ywekyg5vja9"}	The old fashioned revolver, still popular amongst outriders, nomads, smugglers, and desert dwellers alike.	{"range": 30, "salvo": 2, "damage": 2, "weight": 1, "magCount": 3, "magCapacity": 4}	2	{"{\\"keywordId\\": 9}","{\\"keywordId\\": 10}","{\\"keywordId\\": 11}","{\\"keywordId\\": 2}"}	\N	\N	f	\N	1	common	\N
167	Cyber Blade	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739386689/gated/xihmhi4hiquph7c4ijjh.jpg", "publicId": "gated/xihmhi4hiquph7c4ijjh"}	\N	{"damage": 5, "flurry": 2}	\N	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 3}","{\\"keywordId\\": 4}","{\\"keywordId\\": 20}","{\\"keywordId\\": 40}","{\\"keywordId\\": 2}"}	1	99	t	67	1	uncommon	\N
161	Kairos AC-12	""	A mounted autocannon that can deal with a variety of targets. A utilitarian solution to armored and soft targets.	{"range": 50, "salvo": 3, "damage": 6, "magCount": 2, "magCapacity": 30, "currentMagCount": 1, "currentAmmoCount": 30}	10	{"{\\"keywordId\\": 80}","{\\"keywordId\\": 82}","{\\"keywordId\\": 78}"}	6	\N	f	118	1	common	\N
166	Lion’s Claw	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738980130/gated/kkhha11bllitzffzpqh0.jpg", "publicId": "gated/kkhha11bllitzffzpqh0"}	\N	{"damage": 5, "flurry": 1}	\N	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 3}","{\\"keywordId\\": 20}"}	1	98	f	129	1	uncommon	\N
162	Ripper	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736405643/gated/kgc7kg8y4pr2uy4v9yge.jpg", "publicId": "gated/kgc7kg8y4pr2uy4v9yge"}	Another slang term for a cheap automatic pistol. Oftentimes, they’re just modded semi-autos turned into machineguns.	{"range": 15, "salvo": 4, "damage": 2, "weight": 1, "magCount": 3, "magCapacity": 12, "currentMagCount": 3, "currentAmmoCount": 12}	2	{"{\\"keywordId\\": 9}","{\\"keywordId\\": 21}","{\\"keywordId\\": 37}","{\\"keywordId\\": 2}"}	1	\N	t	75	1	common	\N
87	Chain	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738804868/gated/nfuidhit1yjkiqc5qrpj.jpg", "publicId": "gated/nfuidhit1yjkiqc5qrpj"}	Not so much a weapon but still a common sight. Able to harass, harry, and intimidate in equal measure.	{"range": 3, "damage": 2, "flurry": 2, "weight": 1}	0	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 41}","{\\"keywordId\\": 2}"}	\N	\N	f	\N	1	common	\N
114	Twin Konami - (Combined)	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738893902/gated/iainytbhipcje2symj9r.jpg", "publicId": "gated/iainytbhipcje2symj9r"}	Advanced dual energy axes that can temporarily link together to unleash their combined power.	{"damage": 12, "flurry": 1, "weight": 5, "magCount": 4, "magCapacity": 1}	17	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 8}","{\\"keywordId\\": 76}"}	\N	\N	f	\N	1	rare	\N
94	Catalyst Greataxe	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738804549/gated/pkz7mx5oxnxpty1mvlja.jpg", "publicId": "gated/pkz7mx5oxnxpty1mvlja"}	This double sided axe features a reloadable system that combusts local air.	{"damage": 9, "flurry": 2, "weight": 5, "magCount": 2, "magCapacity": 2}	15	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 8}","{\\"value\\": 2, \\"keywordId\\": 29}"}	\N	\N	f	\N	1	uncommon	\N
159	Mazer Beam Cannon - Charge 2	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735965244/gated/twskj0rcgtgwrvmabwug.jpg", "publicId": "gated/twskj0rcgtgwrvmabwug"}	\N	{"range": 15, "salvo": 2, "damage": 8}	\N	{"{\\"keywordId\\": 9}","{\\"keywordId\\": 20}","{\\"keywordId\\": 2}","{\\"keywordId\\": 27}"}	6	95	t	70	1	artifact	\N
112	Chain Hammer	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738894076/gated/knkaafull6bwmdoe1d1b.jpg", "publicId": "gated/knkaafull6bwmdoe1d1b"}	Devised by rioting mechanics from the I-Pits, this weapon can briefly extend for a devastating hit.	{"range": 2, "damage": 6, "flurry": 2, "weight": 5, "magCount": 2, "magCapacity": 2}	11	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 8}","{\\"keywordId\\": 41}","{\\"keywordId\\": 72}"}	\N	\N	f	\N	1	common	\N
92	Large Improv. Weapon	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738895434/gated/hkraasz1sjsye9a6as2n.jpg", "publicId": "gated/hkraasz1sjsye9a6as2n"}	You grab something big and heavy and you hit somebody with it. It hurts ‘em, you feel good. Why?	{"damage": 5, "flurry": 3, "weight": 3}	0	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 6}","{\\"keywordId\\": 8}"}	\N	\N	f	\N	1	common	\N
108	Plasma Whip	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738897234/gated/n9f79q0wczanh8do7cdz.jpg", "publicId": "gated/n9f79q0wczanh8do7cdz"}	This Church designed weapon features many links of thermo-reactive components attached to a microreactor in a handle.	{"range": 3, "damage": 3, "flurry": 2, "weight": 3, "magCount": 3, "magCapacity": 3}	16	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 41}","{\\"keywordId\\": 2}"}	\N	\N	f	\N	1	uncommon	\N
106	Tonfa	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738899909/gated/b020nfekkwpiaqpfyf2q.png", "publicId": "gated/b020nfekkwpiaqpfyf2q"}	The Raizen Kyoku raise their retainers from a young age, training them in the art of the blade dance with these first.	{"damage": 3, "flurry": 3, "weight": 1}	1	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 2}","{\\"keywordId\\": 59}"}	\N	\N	f	\N	1	common	\N
102	Needle Rifle	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738967964/gated/nfgvu7vabnbrikyhqo5v.jpg", "publicId": "gated/nfgvu7vabnbrikyhqo5v"}	A weapon designed for Corpo assassins utilized to deliver deadly poisons at range.	{"range": 50, "salvo": 1, "damage": 5, "weight": 3, "magCount": 2, "magCapacity": 4}	10	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 10}","{\\"keywordId\\": 40}","{\\"keywordId\\": 44}","{\\"keywordId\\": 50}"}	\N	\N	f	\N	1	uncommon	\N
103	Tank Killer	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738902251/gated/vlbfurithh7zhsceppbi.jpg", "publicId": "gated/vlbfurithh7zhsceppbi"}	An aptly named magazine fed anti-vehicle weapon. An over the shoulder menace.	{"range": 50, "salvo": 1, "damage": 15, "weight": 5, "magCount": 3, "magCapacity": 2}	19	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 10}","{\\"keywordId\\": 28}","{\\"keywordId\\": 24}","{\\"keywordId\\": 33}"}	\N	\N	f	\N	1	rare	\N
68	Mazer Beam Cannon - Charge 3	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735965244/gated/twskj0rcgtgwrvmabwug.jpg", "publicId": "gated/twskj0rcgtgwrvmabwug"}	\N	{"range": 15, "salvo": 1, "damage": 8}	\N	{"{\\"keywordId\\": 9}","{\\"keywordId\\": 10}","{\\"keywordId\\": 20}","{\\"keywordId\\": 26}","{\\"keywordId\\": 2}"}	\N	12	f	\N	1	artifact	\N
69	Mazer Beam Cannon - Charge 1	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735965244/gated/twskj0rcgtgwrvmabwug.jpg", "publicId": "gated/twskj0rcgtgwrvmabwug"}	\N	{"range": 15, "salvo": 2, "damage": 6}	\N	{"{\\"keywordId\\": 9}","{\\"keywordId\\": 20}","{\\"keywordId\\": 2}"}	\N	12	f	\N	1	artifact	\N
70	Mazer Beam Cannon - Charge 2	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735965244/gated/twskj0rcgtgwrvmabwug.jpg", "publicId": "gated/twskj0rcgtgwrvmabwug"}	\N	{"range": 15, "salvo": 2, "damage": 8}	\N	{"{\\"keywordId\\": 9}","{\\"keywordId\\": 20}","{\\"keywordId\\": 2}","{\\"keywordId\\": 27}"}	\N	12	f	\N	1	artifact	\N
130	Fragmentation Grenade	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738967084/gated/cdvgxlrylxugb3mmwpgr.jpg", "publicId": "gated/cdvgxlrylxugb3mmwpgr"}	Shrapnel surrounding some sort of explosive.	{"damage": 6, "weight": 0.5}	2	{"{\\"value\\": 1, \\"keywordId\\": 31}","{\\"keywordId\\": 37}","{\\"value\\": 1, \\"keywordId\\": 52}","{\\"keywordId\\": 85}"}	\N	\N	f	\N	1	uncommon	\N
84	Industrial Driver	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738967646/gated/mjrnpknux5zpsdmcpelz.jpg", "publicId": "gated/mjrnpknux5zpsdmcpelz"}	A modified stake driver; launches gothic projectiles that leave corpses impaled to the walls.	{"range": 15, "salvo": 1, "damage": 12, "weight": 5, "magCount": 6, "magCapacity": 1}	7	{"{\\"keywordId\\": 4}","{\\"keywordId\\": 8}","{\\"keywordId\\": 10}","{\\"keywordId\\": 11}","{\\"keywordId\\": 24}"}	\N	\N	f	\N	1	common	\N
136	Pulse Grenade	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738968034/gated/y7f079pnkot8xfhru5dl.jpg", "publicId": "gated/y7f079pnkot8xfhru5dl"}	Electromagnetic energies that are (mostly) unharmful to humans. Drones and turrets (and similar tech) in the blast are shut down, requiring a reload to re-engage. Characters struck receive dooming on Cybernetica Rolls until the end of your next turn.	{}	3	{"{\\"value\\": 1, \\"keywordId\\": 31}","{\\"keywordId\\": 37}","{\\"keywordId\\": 85}"}	\N	\N	f	\N	1	uncommon	\N
138	Boom Hand	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1738989995/gated/kjmnpj3cruage3j177zx.jpg", "publicId": "gated/kjmnpj3cruage3j177zx"}	\N	{"flurry": 1, "magCount": 3, "magCapacity": 1}	\N	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 20}","{\\"keywordId\\": 2}","{\\"keywordId\\": 39}"}	\N	66	f	\N	1	uncommon	\N
181	Kairos AC-12	\N	A mounted autocannon that can deal with a variety of targets. A utilitarian solution to armored and soft targets.	{"range": 50, "salvo": 3, "damage": 6, "magCount": 2, "magCapacity": 30}	10	{"{\\"keywordId\\": 80}","{\\"keywordId\\": 82}","{\\"keywordId\\": 78}"}	\N	\N	f	\N	1	common	8
169	Nano-Combi (A)	\N	A police weapon that has two fire profiles (A/B), based on the combined weaponry in its linked systems.	{"range": 50, "salvo": 8, "damage": 5, "magCount": 3, "magCapacity": 50}	50	{"{\\"keywordId\\": 82}","{\\"keywordId\\": 80}","{\\"value\\": 2, \\"keywordId\\": 22}"}	\N	\N	f	\N	1	common	1
170	Nano-Combi (B)	\N	A police weapon that has two fire profiles (A/B), based on the combined weaponry in its linked systems.	{"range": 50, "salvo": 2, "damage": 10, "magCount": 3, "magCapacity": 50}	50	{"{\\"keywordId\\": 31}","{\\"value\\": 10, \\"keywordId\\": 66}","{\\"keywordId\\": 80}","{\\"keywordId\\": 82}"}	\N	\N	f	\N	1	common	1
171	Kairos AC-12	\N	A mounted autocannon that can deal with a variety of targets. A utilitarian solution to armored and soft targets.	{"range": 50, "salvo": 3, "damage": 6, "magCount": 2, "magCapacity": 30}	10	{"{\\"keywordId\\": 80}","{\\"keywordId\\": 82}","{\\"keywordId\\": 78}"}	\N	\N	f	\N	1	common	2
172	Gorrig ART	\N	Officially declared as a riot suppression tool, the MGL-60 sprays out a bombardment of situational munitions.	{"range": 30, "salvo": 6, "magCount": 2, "magCapacity": 18}	10	{"{\\"keywordId\\": 39}","{\\"keywordId\\": 82}"}	\N	\N	f	\N	1	common	3
173	MAIW .50	\N	The Mobile Anti-Infantry Weapon. Sprays out airburst detonating flechette munitions.	{"range": 40, "salvo": 10, "damage": 4, "magCount": 1, "magCapacity": 150}	80	{"{\\"keywordId\\": 82}","{\\"keywordId\\": 26}","{\\"value\\": 2, \\"keywordId\\": 22}"}	\N	\N	f	\N	1	common	3
174	Nano-Combi (A)	\N	A police weapon that has two fire profiles (A/B), based on the combined weaponry in its linked systems.	{"range": 50, "salvo": 8, "damage": 5, "magCount": 3, "magCapacity": 50}	50	{"{\\"keywordId\\": 82}","{\\"keywordId\\": 80}","{\\"value\\": 2, \\"keywordId\\": 22}"}	\N	\N	f	\N	1	common	3
175	Nano-Combi (B)	\N	A police weapon that has two fire profiles (A/B), based on the combined weaponry in its linked systems.	{"range": 50, "salvo": 2, "damage": 10, "magCount": 3, "magCapacity": 50}	50	{"{\\"keywordId\\": 31}","{\\"value\\": 10, \\"keywordId\\": 66}","{\\"keywordId\\": 80}","{\\"keywordId\\": 82}"}	\N	\N	f	\N	1	common	3
176	Jongxi mk.998	\N	An industrial powerclaw designed to grip and hoist materials. As it so happens, it can in fact grip things too far.	{"range": 3, "damage": 12, "flurry": 1}	9	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 41}","{\\"keywordId\\": 82}"}	\N	\N	f	\N	1	common	5
177	SP-919	\N	A devastating and rare weapon. Its ripping plasma blasts sound like rolling thunder when heard from faraway.	{"range": 50, "salvo": 10, "damage": 6, "magCount": 2, "magCapacity": 50}	100	{"{\\"value\\": 3, \\"keywordId\\": 22}","{\\"keywordId\\": 26}","{\\"keywordId\\": 82}"}	\N	\N	f	\N	1	common	6
178	XLR-77	\N	One of the most advanced weapons ever created, this mounted railgun is a dealer of pure death.	{"range": 1000, "salvo": 1, "damage": 20, "magCount": 11, "magCapacity": 1}	150	{"{\\"keywordId\\": 10}","{\\"value\\": 2, \\"keywordId\\": 31}","{\\"keywordId\\": 58}","{\\"keywordId\\": 82}"}	\N	\N	f	\N	1	common	6
179	APD-10	\N	Mounted onto the Locust, this weapon was responsible for the deaths of tens of thousands of sappers, as recorded by its onboard metrics.	{"salvo": 1, "damage": 16, "magCount": 1, "magCapacity": 5}	30	{"{\\"value\\": 4, \\"keywordId\\": 31}","{\\"value\\": 4, \\"keywordId\\": 52}","{\\"keywordId\\": 62}","{\\"keywordId\\": 82}"}	\N	\N	f	\N	1	common	6
180	Kairos AC-12	\N	A mounted autocannon that can deal with a variety of targets. A utilitarian solution to armored and soft targets.	{"range": 50, "salvo": 3, "damage": 6, "magCount": 2, "magCapacity": 30}	10	{"{\\"keywordId\\": 80}","{\\"keywordId\\": 82}","{\\"keywordId\\": 78}"}	\N	\N	f	\N	1	common	8
182	Salamander’s Claw	\N	This advanced power claw links to the user through neuroconnectors. In addition to its melee function, it can be used to scale vertical walls at half the suit’s agility rating.	{"range": 2, "damage": 8, "flurry": 1}	\N	{"{\\"keywordId\\": 81}","{\\"keywordId\\": 82}","{\\"keywordId\\": 1}","{\\"keywordId\\": 41}"}	\N	\N	f	\N	1	common	7
183	Industrial Driver	""	A modified stake driver; launches gothic projectiles that leave corpses impaled to the walls.	{"range": 50, "salvo": 6, "damage": 4, "weight": 5, "magCount": 3, "magCapacity": 20, "currentMagCount": 2, "currentAmmoCount": 20}	7	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 24}","{\\"keywordId\\": 4}","{\\"keywordId\\": 11}","{\\"keywordId\\": 10}","{\\"keywordId\\": 82}"}	\N	\N	f	\N	1	common	\N
160	Mazer Beam Cannon - Charge 3	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735965244/gated/twskj0rcgtgwrvmabwug.jpg", "publicId": "gated/twskj0rcgtgwrvmabwug"}	\N	{"range": 15, "salvo": 1, "damage": 8}	\N	{"{\\"keywordId\\": 9}","{\\"keywordId\\": 10}","{\\"keywordId\\": 20}","{\\"keywordId\\": 26}","{\\"keywordId\\": 2}"}	6	95	t	68	1	artifact	\N
184	Industrial Driver	\N	A modified stake driver; launches gothic projectiles that leave corpses impaled to the walls.	{"range": 50, "salvo": 6, "damage": 4, "weight": 5, "magCount": 3, "magCapacity": 20, "currentMagCount": 2, "currentAmmoCount": 20}	7	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 24}","{\\"keywordId\\": 4}","{\\"keywordId\\": 11}","{\\"keywordId\\": 10}","{\\"keywordId\\": 82}"}	\N	\N	f	\N	1	common	5
185	Beam Cannon	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736496361/gated/palp8rgdj2eis50vx0mh.jpg", "publicId": "gated/palp8rgdj2eis50vx0mh"}	A high output energy weapon that fires a beam of accelerated plasma through multiple targets.	{"range": 50, "salvo": 1, "damage": 5, "weight": 6, "magCount": 3, "magCapacity": 1, "currentMagCount": 2, "currentAmmoCount": 1}	32	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 10}","{\\"keywordId\\": 24}","{\\"keywordId\\": 58}","{\\"keywordId\\": 64}"}	14	\N	t	104	1	blackMarket	\N
168	Corvid SMG	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736312687/gated/bjpm75wpnwgnwrkjtfwa.jpg", "publicId": "gated/bjpm75wpnwgnwrkjtfwa"}	\N	{"range": 10, "salvo": 5, "damage": 2, "magCount": 2, "magCapacity": 10, "currentMagCount": 1, "currentAmmoCount": 10}	\N	{"{\\"keywordId\\": 9}","{\\"keywordId\\": 21}","{\\"keywordId\\": 22}","{\\"keywordId\\": 2}"}	13	112	t	61	1	uncommon	\N
186	Unarmed	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735941454/gated/neaqjp1z31ji8qsasi4j.jpg", "publicId": "gated/neaqjp1z31ji8qsasi4j"}	God’s greatest gift to mankind.	{"damage": 1}	0	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 5}","{\\"keywordId\\": 6}","{\\"keywordId\\": 2}"}	9	\N	t	22	1	common	\N
61	Corvid SMG	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1739388255/gated/dpzpe2ppoto0rmu9rpou.jpg", "publicId": "gated/dpzpe2ppoto0rmu9rpou"}	\N	{"range": 10, "salvo": 5, "damage": 2, "magCount": 2, "magCapacity": 10}	\N	{"{\\"keywordId\\": 9}","{\\"keywordId\\": 21}","{\\"value\\": 1, \\"keywordId\\": 22}","{\\"keywordId\\": 2}"}	\N	16	f	\N	1	uncommon	\N
\.


--
-- Data for Name: _ArmorToCharacterCart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_ArmorToCharacterCart" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _CharacterCartToCybernetic; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_CharacterCartToCybernetic" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _CharacterCartToItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_CharacterCartToItem" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _CharacterCartToModification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_CharacterCartToModification" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _CharacterCartToVehicle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_CharacterCartToVehicle" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _CharacterCartToWeapon; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_CharacterCartToWeapon" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _CharacterToPerk; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_CharacterToPerk" ("A", "B") FROM stdin;
16	31
16	36
16	37
16	230
16	180
16	183
9	102
9	123
9	124
9	143
21	25
21	28
21	230
21	179
21	186
15	6
15	10
15	220
13	225
13	134
15	236
15	134
6	10
6	17
6	26
6	46
6	66
6	71
6	110
6	114
6	129
6	137
6	143
12	139
12	141
22	134
5	97
5	100
5	104
5	132
12	134
8	9
8	25
8	28
8	38
8	49
18	41
18	225
18	142
14	54
11	1
4	2
4	9
4	26
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
33e9e4ea-a1b4-4849-a109-0dbcd5e8ac58	c9fbe1e27a06b461f094f340ba2179a0e45eddb0d9f63905da9aa554faed7b93	2025-01-06 23:24:30.793799+00	20250106100456_gated_db_0_1	\N	\N	2025-01-06 23:24:30.576932+00	1
cf927dc0-3a3a-4cdb-b9a5-f58db0a126d4	58d182adf8c208a5b1fbfdb71898761efe87f84b5cb4a41f7b4c7e321be7acbd	2025-01-06 23:24:30.938829+00	20250106231437_gated_db_0_2	\N	\N	2025-01-06 23:24:30.834848+00	1
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2025-01-06 09:36:15
20211116045059	2025-01-06 09:36:15
20211116050929	2025-01-06 09:36:15
20211116051442	2025-01-06 09:36:15
20211116212300	2025-01-06 09:36:15
20211116213355	2025-01-06 09:36:15
20211116213934	2025-01-06 09:36:15
20211116214523	2025-01-06 09:36:15
20211122062447	2025-01-06 09:36:15
20211124070109	2025-01-06 09:36:15
20211202204204	2025-01-06 09:36:15
20211202204605	2025-01-06 09:36:15
20211210212804	2025-01-06 09:36:15
20211228014915	2025-01-06 09:36:15
20220107221237	2025-01-06 09:36:15
20220228202821	2025-01-06 09:36:15
20220312004840	2025-01-06 09:36:15
20220603231003	2025-01-06 09:36:15
20220603232444	2025-01-06 09:36:15
20220615214548	2025-01-06 09:36:15
20220712093339	2025-01-06 09:36:15
20220908172859	2025-01-06 09:36:15
20220916233421	2025-01-06 09:36:15
20230119133233	2025-01-06 09:36:15
20230128025114	2025-01-06 09:36:15
20230128025212	2025-01-06 09:36:15
20230227211149	2025-01-06 09:36:15
20230228184745	2025-01-06 09:36:15
20230308225145	2025-01-06 09:36:15
20230328144023	2025-01-06 09:36:15
20231018144023	2025-01-06 09:36:15
20231204144023	2025-01-06 09:36:16
20231204144024	2025-01-06 09:36:16
20231204144025	2025-01-06 09:36:16
20240108234812	2025-01-06 09:36:16
20240109165339	2025-01-06 09:36:16
20240227174441	2025-01-06 09:36:16
20240311171622	2025-01-06 09:36:16
20240321100241	2025-01-06 09:36:16
20240401105812	2025-01-06 09:36:16
20240418121054	2025-01-06 09:36:16
20240523004032	2025-01-06 09:36:16
20240618124746	2025-01-06 09:36:16
20240801235015	2025-01-06 09:36:16
20240805133720	2025-01-06 09:36:16
20240827160934	2025-01-06 09:36:16
20240919163303	2025-01-06 09:36:16
20240919163305	2025-01-06 09:36:16
20241019105805	2025-01-06 09:36:16
20241030150047	2025-01-06 09:36:16
20241108114728	2025-01-06 09:36:16
20241121104152	2025-01-06 09:36:16
20241130184212	2025-01-06 09:36:16
20241220035512	2025-01-08 17:17:41
20241220123912	2025-01-08 17:17:41
20241224161212	2025-01-08 17:17:41
20250107150512	2025-01-08 17:17:41
20250110162412	2025-01-10 23:18:27
20250123174212	2025-01-27 04:35:09
20250128220012	2025-02-01 23:38:53
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-01-06 09:32:16.4873
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-01-06 09:32:16.505347
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2025-01-06 09:32:16.515452
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2025-01-06 09:32:16.551432
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2025-01-06 09:32:16.584729
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2025-01-06 09:32:16.59468
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2025-01-06 09:32:16.605027
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2025-01-06 09:32:16.616273
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2025-01-06 09:32:16.625921
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2025-01-06 09:32:16.636282
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2025-01-06 09:32:16.649102
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2025-01-06 09:32:16.660716
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2025-01-06 09:32:16.67517
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2025-01-06 09:32:16.684923
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2025-01-06 09:32:16.701194
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2025-01-06 09:32:16.763569
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2025-01-06 09:32:16.878144
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2025-01-06 09:32:16.936608
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2025-01-06 09:32:16.964988
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2025-01-06 09:32:16.980016
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2025-01-06 09:32:16.991025
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2025-01-06 09:32:17.011159
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2025-01-06 09:32:17.047108
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2025-01-06 09:32:17.077699
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2025-01-06 09:32:17.088017
25	custom-metadata	67eb93b7e8d401cafcdc97f9ac779e71a79bfe03	2025-01-06 09:32:17.097212
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('pgsodium.key_key_id_seq', 1, false);


--
-- Name: Action_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Action_id_seq"', 194, true);


--
-- Name: Armor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Armor_id_seq"', 29, true);


--
-- Name: BookEntry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."BookEntry_id_seq"', 34, true);


--
-- Name: BookSection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."BookSection_id_seq"', 3, true);


--
-- Name: CharacterCart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CharacterCart_id_seq"', 14, true);


--
-- Name: CharacterCondition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CharacterCondition_id_seq"', 1, false);


--
-- Name: CharacterInventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CharacterInventory_id_seq"', 14, true);


--
-- Name: Character_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Character_id_seq"', 22, true);


--
-- Name: Condition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Condition_id_seq"', 26, true);


--
-- Name: Cybernetic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Cybernetic_id_seq"', 127, true);


--
-- Name: Error_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Error_id_seq"', 9, true);


--
-- Name: ItemCondition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ItemCondition_id_seq"', 1, false);


--
-- Name: Item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Item_id_seq"', 24, true);


--
-- Name: Keyword_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Keyword_id_seq"', 89, true);


--
-- Name: Modification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Modification_id_seq"', 13, true);


--
-- Name: Modifier_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Modifier_id_seq"', 35, true);


--
-- Name: PatchNote_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PatchNote_id_seq"', 6, true);


--
-- Name: Perk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Perk_id_seq"', 249, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 13, true);


--
-- Name: Vehicle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Vehicle_id_seq"', 18, true);


--
-- Name: Weapon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Weapon_id_seq"', 186, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: Action Action_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Action"
    ADD CONSTRAINT "Action_pkey" PRIMARY KEY (id);


--
-- Name: Armor Armor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Armor"
    ADD CONSTRAINT "Armor_pkey" PRIMARY KEY (id);


--
-- Name: BookEntry BookEntry_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BookEntry"
    ADD CONSTRAINT "BookEntry_pkey" PRIMARY KEY (id);


--
-- Name: BookSection BookSection_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BookSection"
    ADD CONSTRAINT "BookSection_pkey" PRIMARY KEY (id);


--
-- Name: CharacterCart CharacterCart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CharacterCart"
    ADD CONSTRAINT "CharacterCart_pkey" PRIMARY KEY (id);


--
-- Name: CharacterCondition CharacterCondition_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CharacterCondition"
    ADD CONSTRAINT "CharacterCondition_pkey" PRIMARY KEY (id);


--
-- Name: CharacterInventory CharacterInventory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CharacterInventory"
    ADD CONSTRAINT "CharacterInventory_pkey" PRIMARY KEY (id);


--
-- Name: Character Character_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Character"
    ADD CONSTRAINT "Character_pkey" PRIMARY KEY (id);


--
-- Name: Condition Condition_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Condition"
    ADD CONSTRAINT "Condition_pkey" PRIMARY KEY (id);


--
-- Name: Cybernetic Cybernetic_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cybernetic"
    ADD CONSTRAINT "Cybernetic_pkey" PRIMARY KEY (id);


--
-- Name: Error Error_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Error"
    ADD CONSTRAINT "Error_pkey" PRIMARY KEY (id);


--
-- Name: ItemCondition ItemCondition_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ItemCondition"
    ADD CONSTRAINT "ItemCondition_pkey" PRIMARY KEY (id);


--
-- Name: Item Item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Item"
    ADD CONSTRAINT "Item_pkey" PRIMARY KEY (id);


--
-- Name: Keyword Keyword_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Keyword"
    ADD CONSTRAINT "Keyword_pkey" PRIMARY KEY (id);


--
-- Name: Modification Modification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Modification"
    ADD CONSTRAINT "Modification_pkey" PRIMARY KEY (id);


--
-- Name: Modifier Modifier_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Modifier"
    ADD CONSTRAINT "Modifier_pkey" PRIMARY KEY (id);


--
-- Name: PatchNote PatchNote_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PatchNote"
    ADD CONSTRAINT "PatchNote_pkey" PRIMARY KEY (id);


--
-- Name: Perk Perk_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Perk"
    ADD CONSTRAINT "Perk_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Vehicle Vehicle_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vehicle"
    ADD CONSTRAINT "Vehicle_pkey" PRIMARY KEY (id);


--
-- Name: Weapon Weapon_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Weapon"
    ADD CONSTRAINT "Weapon_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: BookEntry_page_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "BookEntry_page_key" ON public."BookEntry" USING btree (page);


--
-- Name: BookEntry_title_sectionId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "BookEntry_title_sectionId_key" ON public."BookEntry" USING btree (title, "sectionId");


--
-- Name: BookSection_order_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "BookSection_order_key" ON public."BookSection" USING btree ("order");


--
-- Name: BookSection_title_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "BookSection_title_key" ON public."BookSection" USING btree (title);


--
-- Name: CharacterCart_characterId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "CharacterCart_characterId_key" ON public."CharacterCart" USING btree ("characterId");


--
-- Name: CharacterInventory_characterId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "CharacterInventory_characterId_key" ON public."CharacterInventory" USING btree ("characterId");


--
-- Name: Keyword_name_keywordType_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Keyword_name_keywordType_key" ON public."Keyword" USING btree (name, "keywordType");


--
-- Name: PatchNote_version_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "PatchNote_version_key" ON public."PatchNote" USING btree (version);


--
-- Name: Perk_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Perk_name_key" ON public."Perk" USING btree (name);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_facebookId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_facebookId_key" ON public."User" USING btree ("facebookId");


--
-- Name: User_googleId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_googleId_key" ON public."User" USING btree ("googleId");


--
-- Name: _ArmorToCharacterCart_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_ArmorToCharacterCart_AB_unique" ON public."_ArmorToCharacterCart" USING btree ("A", "B");


--
-- Name: _ArmorToCharacterCart_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_ArmorToCharacterCart_B_index" ON public."_ArmorToCharacterCart" USING btree ("B");


--
-- Name: _CharacterCartToCybernetic_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_CharacterCartToCybernetic_AB_unique" ON public."_CharacterCartToCybernetic" USING btree ("A", "B");


--
-- Name: _CharacterCartToCybernetic_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_CharacterCartToCybernetic_B_index" ON public."_CharacterCartToCybernetic" USING btree ("B");


--
-- Name: _CharacterCartToItem_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_CharacterCartToItem_AB_unique" ON public."_CharacterCartToItem" USING btree ("A", "B");


--
-- Name: _CharacterCartToItem_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_CharacterCartToItem_B_index" ON public."_CharacterCartToItem" USING btree ("B");


--
-- Name: _CharacterCartToModification_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_CharacterCartToModification_AB_unique" ON public."_CharacterCartToModification" USING btree ("A", "B");


--
-- Name: _CharacterCartToModification_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_CharacterCartToModification_B_index" ON public."_CharacterCartToModification" USING btree ("B");


--
-- Name: _CharacterCartToVehicle_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_CharacterCartToVehicle_AB_unique" ON public."_CharacterCartToVehicle" USING btree ("A", "B");


--
-- Name: _CharacterCartToVehicle_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_CharacterCartToVehicle_B_index" ON public."_CharacterCartToVehicle" USING btree ("B");


--
-- Name: _CharacterCartToWeapon_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_CharacterCartToWeapon_AB_unique" ON public."_CharacterCartToWeapon" USING btree ("A", "B");


--
-- Name: _CharacterCartToWeapon_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_CharacterCartToWeapon_B_index" ON public."_CharacterCartToWeapon" USING btree ("B");


--
-- Name: _CharacterToPerk_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_CharacterToPerk_AB_unique" ON public."_CharacterToPerk" USING btree ("A", "B");


--
-- Name: _CharacterToPerk_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_CharacterToPerk_B_index" ON public."_CharacterToPerk" USING btree ("B");


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: Action Action_armorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Action"
    ADD CONSTRAINT "Action_armorId_fkey" FOREIGN KEY ("armorId") REFERENCES public."Armor"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Action Action_characterInventoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Action"
    ADD CONSTRAINT "Action_characterInventoryId_fkey" FOREIGN KEY ("characterInventoryId") REFERENCES public."CharacterInventory"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Action Action_cyberneticId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Action"
    ADD CONSTRAINT "Action_cyberneticId_fkey" FOREIGN KEY ("cyberneticId") REFERENCES public."Cybernetic"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Action Action_itemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Action"
    ADD CONSTRAINT "Action_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES public."Item"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Action Action_weaponId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Action"
    ADD CONSTRAINT "Action_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES public."Weapon"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Armor Armor_characterInventoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Armor"
    ADD CONSTRAINT "Armor_characterInventoryId_fkey" FOREIGN KEY ("characterInventoryId") REFERENCES public."CharacterInventory"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Armor Armor_cyberneticId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Armor"
    ADD CONSTRAINT "Armor_cyberneticId_fkey" FOREIGN KEY ("cyberneticId") REFERENCES public."Cybernetic"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: BookEntry BookEntry_sectionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BookEntry"
    ADD CONSTRAINT "BookEntry_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES public."BookSection"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CharacterCart CharacterCart_characterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CharacterCart"
    ADD CONSTRAINT "CharacterCart_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES public."Character"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CharacterCondition CharacterCondition_characterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CharacterCondition"
    ADD CONSTRAINT "CharacterCondition_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES public."Character"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CharacterCondition CharacterCondition_conditionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CharacterCondition"
    ADD CONSTRAINT "CharacterCondition_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES public."Condition"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CharacterInventory CharacterInventory_characterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CharacterInventory"
    ADD CONSTRAINT "CharacterInventory_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES public."Character"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Character Character_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Character"
    ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Cybernetic Cybernetic_characterInventoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cybernetic"
    ADD CONSTRAINT "Cybernetic_characterInventoryId_fkey" FOREIGN KEY ("characterInventoryId") REFERENCES public."CharacterInventory"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Error Error_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Error"
    ADD CONSTRAINT "Error_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ItemCondition ItemCondition_armorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ItemCondition"
    ADD CONSTRAINT "ItemCondition_armorId_fkey" FOREIGN KEY ("armorId") REFERENCES public."Armor"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ItemCondition ItemCondition_conditionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ItemCondition"
    ADD CONSTRAINT "ItemCondition_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES public."Condition"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ItemCondition ItemCondition_cyberneticId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ItemCondition"
    ADD CONSTRAINT "ItemCondition_cyberneticId_fkey" FOREIGN KEY ("cyberneticId") REFERENCES public."Cybernetic"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ItemCondition ItemCondition_itemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ItemCondition"
    ADD CONSTRAINT "ItemCondition_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES public."Item"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ItemCondition ItemCondition_modificationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ItemCondition"
    ADD CONSTRAINT "ItemCondition_modificationId_fkey" FOREIGN KEY ("modificationId") REFERENCES public."Modification"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ItemCondition ItemCondition_vehicleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ItemCondition"
    ADD CONSTRAINT "ItemCondition_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES public."Vehicle"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ItemCondition ItemCondition_weaponId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ItemCondition"
    ADD CONSTRAINT "ItemCondition_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES public."Weapon"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Item Item_characterInventoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Item"
    ADD CONSTRAINT "Item_characterInventoryId_fkey" FOREIGN KEY ("characterInventoryId") REFERENCES public."CharacterInventory"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Modification Modification_characterInventoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Modification"
    ADD CONSTRAINT "Modification_characterInventoryId_fkey" FOREIGN KEY ("characterInventoryId") REFERENCES public."CharacterInventory"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Modification Modification_vehicleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Modification"
    ADD CONSTRAINT "Modification_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES public."Vehicle"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Modifier Modifier_actionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Modifier"
    ADD CONSTRAINT "Modifier_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES public."Action"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Modifier Modifier_cyberneticId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Modifier"
    ADD CONSTRAINT "Modifier_cyberneticId_fkey" FOREIGN KEY ("cyberneticId") REFERENCES public."Cybernetic"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Modifier Modifier_itemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Modifier"
    ADD CONSTRAINT "Modifier_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES public."Item"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Modifier Modifier_perkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Modifier"
    ADD CONSTRAINT "Modifier_perkId_fkey" FOREIGN KEY ("perkId") REFERENCES public."Perk"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Vehicle Vehicle_characterInventoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vehicle"
    ADD CONSTRAINT "Vehicle_characterInventoryId_fkey" FOREIGN KEY ("characterInventoryId") REFERENCES public."CharacterInventory"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Weapon Weapon_characterInventoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Weapon"
    ADD CONSTRAINT "Weapon_characterInventoryId_fkey" FOREIGN KEY ("characterInventoryId") REFERENCES public."CharacterInventory"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Weapon Weapon_cyberneticId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Weapon"
    ADD CONSTRAINT "Weapon_cyberneticId_fkey" FOREIGN KEY ("cyberneticId") REFERENCES public."Cybernetic"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Weapon Weapon_vehicleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Weapon"
    ADD CONSTRAINT "Weapon_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES public."Vehicle"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: _ArmorToCharacterCart _ArmorToCharacterCart_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_ArmorToCharacterCart"
    ADD CONSTRAINT "_ArmorToCharacterCart_A_fkey" FOREIGN KEY ("A") REFERENCES public."Armor"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ArmorToCharacterCart _ArmorToCharacterCart_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_ArmorToCharacterCart"
    ADD CONSTRAINT "_ArmorToCharacterCart_B_fkey" FOREIGN KEY ("B") REFERENCES public."CharacterCart"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CharacterCartToCybernetic _CharacterCartToCybernetic_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CharacterCartToCybernetic"
    ADD CONSTRAINT "_CharacterCartToCybernetic_A_fkey" FOREIGN KEY ("A") REFERENCES public."CharacterCart"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CharacterCartToCybernetic _CharacterCartToCybernetic_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CharacterCartToCybernetic"
    ADD CONSTRAINT "_CharacterCartToCybernetic_B_fkey" FOREIGN KEY ("B") REFERENCES public."Cybernetic"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CharacterCartToItem _CharacterCartToItem_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CharacterCartToItem"
    ADD CONSTRAINT "_CharacterCartToItem_A_fkey" FOREIGN KEY ("A") REFERENCES public."CharacterCart"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CharacterCartToItem _CharacterCartToItem_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CharacterCartToItem"
    ADD CONSTRAINT "_CharacterCartToItem_B_fkey" FOREIGN KEY ("B") REFERENCES public."Item"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CharacterCartToModification _CharacterCartToModification_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CharacterCartToModification"
    ADD CONSTRAINT "_CharacterCartToModification_A_fkey" FOREIGN KEY ("A") REFERENCES public."CharacterCart"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CharacterCartToModification _CharacterCartToModification_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CharacterCartToModification"
    ADD CONSTRAINT "_CharacterCartToModification_B_fkey" FOREIGN KEY ("B") REFERENCES public."Modification"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CharacterCartToVehicle _CharacterCartToVehicle_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CharacterCartToVehicle"
    ADD CONSTRAINT "_CharacterCartToVehicle_A_fkey" FOREIGN KEY ("A") REFERENCES public."CharacterCart"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CharacterCartToVehicle _CharacterCartToVehicle_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CharacterCartToVehicle"
    ADD CONSTRAINT "_CharacterCartToVehicle_B_fkey" FOREIGN KEY ("B") REFERENCES public."Vehicle"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CharacterCartToWeapon _CharacterCartToWeapon_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CharacterCartToWeapon"
    ADD CONSTRAINT "_CharacterCartToWeapon_A_fkey" FOREIGN KEY ("A") REFERENCES public."CharacterCart"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CharacterCartToWeapon _CharacterCartToWeapon_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CharacterCartToWeapon"
    ADD CONSTRAINT "_CharacterCartToWeapon_B_fkey" FOREIGN KEY ("B") REFERENCES public."Weapon"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CharacterToPerk _CharacterToPerk_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CharacterToPerk"
    ADD CONSTRAINT "_CharacterToPerk_A_fkey" FOREIGN KEY ("A") REFERENCES public."Character"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CharacterToPerk _CharacterToPerk_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CharacterToPerk"
    ADD CONSTRAINT "_CharacterToPerk_B_fkey" FOREIGN KEY ("B") REFERENCES public."Perk"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT ALL ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT ALL ON SCHEMA storage TO postgres;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;


--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;


--
-- Name: FUNCTION algorithm_sign(signables text, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) FROM postgres;
GRANT ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea, text[], text[]) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.crypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.dearmor(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_bytes(integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_uuid() FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text, integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM postgres;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM postgres;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint) TO dashboard_user;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_key_id(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION sign(payload json, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) FROM postgres;
GRANT ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) TO dashboard_user;


--
-- Name: FUNCTION try_cast_double(inp text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.try_cast_double(inp text) FROM postgres;
GRANT ALL ON FUNCTION extensions.try_cast_double(inp text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.try_cast_double(inp text) TO dashboard_user;


--
-- Name: FUNCTION url_decode(data text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.url_decode(data text) FROM postgres;
GRANT ALL ON FUNCTION extensions.url_decode(data text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.url_decode(data text) TO dashboard_user;


--
-- Name: FUNCTION url_encode(data bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.url_encode(data bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.url_encode(data bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.url_encode(data bytea) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1mc() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v4() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_nil() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_dns() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_oid() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_url() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_x500() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;


--
-- Name: FUNCTION verify(token text, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) FROM postgres;
GRANT ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) TO dashboard_user;


--
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: postgres
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;


--
-- Name: FUNCTION crypto_aead_det_decrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea); Type: ACL; Schema: pgsodium; Owner: pgsodium_keymaker
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_decrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea) TO service_role;


--
-- Name: FUNCTION crypto_aead_det_encrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea); Type: ACL; Schema: pgsodium; Owner: pgsodium_keymaker
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_encrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea) TO service_role;


--
-- Name: FUNCTION crypto_aead_det_keygen(); Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_keygen() TO service_role;


--
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.flow_state TO dashboard_user;


--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.identities TO dashboard_user;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_factors TO dashboard_user;


--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_providers TO dashboard_user;


--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.schema_migrations TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.schema_migrations TO postgres;
GRANT SELECT ON TABLE auth.schema_migrations TO postgres WITH GRANT OPTION;


--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sessions TO dashboard_user;


--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_domains TO dashboard_user;


--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_providers TO dashboard_user;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE extensions.pg_stat_statements FROM postgres;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE extensions.pg_stat_statements TO dashboard_user;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE extensions.pg_stat_statements_info FROM postgres;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE extensions.pg_stat_statements_info TO dashboard_user;


--
-- Name: TABLE decrypted_key; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE pgsodium.decrypted_key TO pgsodium_keyholder;


--
-- Name: TABLE masking_rule; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE pgsodium.masking_rule TO pgsodium_keyholder;


--
-- Name: TABLE mask_columns; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE pgsodium.mask_columns TO pgsodium_keyholder;


--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.messages TO postgres;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.schema_migrations TO postgres;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.subscription TO postgres;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets TO service_role;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets TO postgres;


--
-- Name: TABLE migrations; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.migrations TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.migrations TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.migrations TO service_role;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.migrations TO postgres;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.objects TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.objects TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.objects TO service_role;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.objects TO postgres;


--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;


--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: pgsodium; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium GRANT ALL ON SEQUENCES TO pgsodium_keyholder;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: pgsodium; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO pgsodium_keyholder;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON SEQUENCES TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON FUNCTIONS TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: postgres
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO postgres;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--


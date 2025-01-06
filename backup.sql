--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6 (Ubuntu 16.6-1.pgdg22.04+1)
-- Dumped by pg_dump version 17.2 (Ubuntu 17.2-1.pgdg22.04+1)

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: ben_long
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO ben_long;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: ben_long
--

COMMENT ON SCHEMA public IS '';


--
-- Name: ActionType; Type: TYPE; Schema: public; Owner: ben_long
--

CREATE TYPE public."ActionType" AS ENUM (
    'action',
    'extendedAction',
    'reaction'
);


ALTER TYPE public."ActionType" OWNER TO ben_long;

--
-- Name: CyberneticType; Type: TYPE; Schema: public; Owner: ben_long
--

CREATE TYPE public."CyberneticType" AS ENUM (
    'roll',
    'stat',
    'offensive',
    'defensive',
    'function'
);


ALTER TYPE public."CyberneticType" OWNER TO ben_long;

--
-- Name: KeywordType; Type: TYPE; Schema: public; Owner: ben_long
--

CREATE TYPE public."KeywordType" AS ENUM (
    'weapon',
    'armor',
    'cybernetic'
);


ALTER TYPE public."KeywordType" OWNER TO ben_long;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: ben_long
--

CREATE TYPE public."UserRole" AS ENUM (
    'GUEST',
    'USER',
    'ADMIN',
    'SUPERADMIN'
);


ALTER TYPE public."UserRole" OWNER TO ben_long;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Action; Type: TABLE; Schema: public; Owner: ben_long
--

CREATE TABLE public."Action" (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    costs jsonb,
    attribute text,
    skill text,
    "actionType" public."ActionType" NOT NULL,
    "actionSubtypes" text[]
);


ALTER TABLE public."Action" OWNER TO ben_long;

--
-- Name: Action_id_seq; Type: SEQUENCE; Schema: public; Owner: ben_long
--

CREATE SEQUENCE public."Action_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Action_id_seq" OWNER TO ben_long;

--
-- Name: Action_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ben_long
--

ALTER SEQUENCE public."Action_id_seq" OWNED BY public."Action".id;


--
-- Name: Armor; Type: TABLE; Schema: public; Owner: ben_long
--

CREATE TABLE public."Armor" (
    id integer NOT NULL,
    name text NOT NULL,
    picture jsonb,
    description text,
    stats jsonb NOT NULL,
    price integer,
    keywords jsonb[]
);


ALTER TABLE public."Armor" OWNER TO ben_long;

--
-- Name: Armor_id_seq; Type: SEQUENCE; Schema: public; Owner: ben_long
--

CREATE SEQUENCE public."Armor_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Armor_id_seq" OWNER TO ben_long;

--
-- Name: Armor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ben_long
--

ALTER SEQUENCE public."Armor_id_seq" OWNED BY public."Armor".id;


--
-- Name: BookEntry; Type: TABLE; Schema: public; Owner: ben_long
--

CREATE TABLE public."BookEntry" (
    id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL
);


ALTER TABLE public."BookEntry" OWNER TO ben_long;

--
-- Name: BookEntry_id_seq; Type: SEQUENCE; Schema: public; Owner: ben_long
--

CREATE SEQUENCE public."BookEntry_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BookEntry_id_seq" OWNER TO ben_long;

--
-- Name: BookEntry_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ben_long
--

ALTER SEQUENCE public."BookEntry_id_seq" OWNED BY public."BookEntry".id;


--
-- Name: Character; Type: TABLE; Schema: public; Owner: ben_long
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
    "lastName" text
);


ALTER TABLE public."Character" OWNER TO ben_long;

--
-- Name: Character_id_seq; Type: SEQUENCE; Schema: public; Owner: ben_long
--

CREATE SEQUENCE public."Character_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Character_id_seq" OWNER TO ben_long;

--
-- Name: Character_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ben_long
--

ALTER SEQUENCE public."Character_id_seq" OWNED BY public."Character".id;


--
-- Name: Cybernetic; Type: TABLE; Schema: public; Owner: ben_long
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
    keywords jsonb[]
);


ALTER TABLE public."Cybernetic" OWNER TO ben_long;

--
-- Name: Cybernetic_id_seq; Type: SEQUENCE; Schema: public; Owner: ben_long
--

CREATE SEQUENCE public."Cybernetic_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Cybernetic_id_seq" OWNER TO ben_long;

--
-- Name: Cybernetic_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ben_long
--

ALTER SEQUENCE public."Cybernetic_id_seq" OWNED BY public."Cybernetic".id;


--
-- Name: Keyword; Type: TABLE; Schema: public; Owner: ben_long
--

CREATE TABLE public."Keyword" (
    id integer NOT NULL,
    "keywordType" public."KeywordType" NOT NULL,
    name text NOT NULL,
    description text NOT NULL
);


ALTER TABLE public."Keyword" OWNER TO ben_long;

--
-- Name: Keyword_id_seq; Type: SEQUENCE; Schema: public; Owner: ben_long
--

CREATE SEQUENCE public."Keyword_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Keyword_id_seq" OWNER TO ben_long;

--
-- Name: Keyword_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ben_long
--

ALTER SEQUENCE public."Keyword_id_seq" OWNED BY public."Keyword".id;


--
-- Name: Perk; Type: TABLE; Schema: public; Owner: ben_long
--

CREATE TABLE public."Perk" (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    requirements jsonb
);


ALTER TABLE public."Perk" OWNER TO ben_long;

--
-- Name: Perk_id_seq; Type: SEQUENCE; Schema: public; Owner: ben_long
--

CREATE SEQUENCE public."Perk_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Perk_id_seq" OWNER TO ben_long;

--
-- Name: Perk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ben_long
--

ALTER SEQUENCE public."Perk_id_seq" OWNED BY public."Perk".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: ben_long
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
    role public."UserRole" DEFAULT 'ADMIN'::public."UserRole" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User" OWNER TO ben_long;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: ben_long
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO ben_long;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ben_long
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: Weapon; Type: TABLE; Schema: public; Owner: ben_long
--

CREATE TABLE public."Weapon" (
    id integer NOT NULL,
    name text NOT NULL,
    picture jsonb,
    description text,
    stats jsonb NOT NULL,
    price integer,
    keywords jsonb[]
);


ALTER TABLE public."Weapon" OWNER TO ben_long;

--
-- Name: Weapon_id_seq; Type: SEQUENCE; Schema: public; Owner: ben_long
--

CREATE SEQUENCE public."Weapon_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Weapon_id_seq" OWNER TO ben_long;

--
-- Name: Weapon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ben_long
--

ALTER SEQUENCE public."Weapon_id_seq" OWNED BY public."Weapon".id;


--
-- Name: _ArmorToCharacter; Type: TABLE; Schema: public; Owner: ben_long
--

CREATE TABLE public."_ArmorToCharacter" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_ArmorToCharacter" OWNER TO ben_long;

--
-- Name: _CharacterToCybernetic; Type: TABLE; Schema: public; Owner: ben_long
--

CREATE TABLE public."_CharacterToCybernetic" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CharacterToCybernetic" OWNER TO ben_long;

--
-- Name: _CharacterToPerk; Type: TABLE; Schema: public; Owner: ben_long
--

CREATE TABLE public."_CharacterToPerk" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CharacterToPerk" OWNER TO ben_long;

--
-- Name: _CharacterToWeapon; Type: TABLE; Schema: public; Owner: ben_long
--

CREATE TABLE public."_CharacterToWeapon" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CharacterToWeapon" OWNER TO ben_long;

--
-- Name: _CyberneticActions; Type: TABLE; Schema: public; Owner: ben_long
--

CREATE TABLE public."_CyberneticActions" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CyberneticActions" OWNER TO ben_long;

--
-- Name: _CyberneticArmor; Type: TABLE; Schema: public; Owner: ben_long
--

CREATE TABLE public."_CyberneticArmor" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CyberneticArmor" OWNER TO ben_long;

--
-- Name: _CyberneticWeapons; Type: TABLE; Schema: public; Owner: ben_long
--

CREATE TABLE public."_CyberneticWeapons" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CyberneticWeapons" OWNER TO ben_long;

--
-- Name: Action id; Type: DEFAULT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."Action" ALTER COLUMN id SET DEFAULT nextval('public."Action_id_seq"'::regclass);


--
-- Name: Armor id; Type: DEFAULT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."Armor" ALTER COLUMN id SET DEFAULT nextval('public."Armor_id_seq"'::regclass);


--
-- Name: BookEntry id; Type: DEFAULT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."BookEntry" ALTER COLUMN id SET DEFAULT nextval('public."BookEntry_id_seq"'::regclass);


--
-- Name: Character id; Type: DEFAULT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."Character" ALTER COLUMN id SET DEFAULT nextval('public."Character_id_seq"'::regclass);


--
-- Name: Cybernetic id; Type: DEFAULT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."Cybernetic" ALTER COLUMN id SET DEFAULT nextval('public."Cybernetic_id_seq"'::regclass);


--
-- Name: Keyword id; Type: DEFAULT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."Keyword" ALTER COLUMN id SET DEFAULT nextval('public."Keyword_id_seq"'::regclass);


--
-- Name: Perk id; Type: DEFAULT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."Perk" ALTER COLUMN id SET DEFAULT nextval('public."Perk_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: Weapon id; Type: DEFAULT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."Weapon" ALTER COLUMN id SET DEFAULT nextval('public."Weapon_id_seq"'::regclass);


--
-- Data for Name: Action; Type: TABLE DATA; Schema: public; Owner: ben_long
--

COPY public."Action" (id, name, description, costs, attribute, skill, "actionType", "actionSubtypes") FROM stdin;
19	Razor’s Edge	As a reaction, gain +1 Evasion until the end of your next turn.	[{"stat": "power", "value": 1}]			reaction	{unique}
20	Let It Burn	As a reaction, you become immune to Burning. Remove all stacks; you cannot receive any until the end of your next turn.	[{"stat": "power", "value": 1}]			reaction	{unique}
21	Ride the Lightning	Activate only once per turn. Gain an extra action this turn. You can make an additional attack and ignore the two movement salvo/flurry rule.	[{"stat": "power", "value": 1}, {"stat": "health", "value": 3}]			action	{unique}
22	Split Second	Activate only once per day. You take an extra turn after this one ends. During that turn, other characters can’t use reactions unless they have a Sandorino or something similar.	[{"stat": "power", "value": 1}, {"stat": "health", "value": 5}]			action	{unique}
24	Imbue High Impact	Give your unarmed attacks High Impact. They retain the condition until they successfully break evasion.	[{"stat": "power", "value": 1}]			action	{unique}
23	Imbue Shocking	Give your unarmed attacks Shocking 1. They retain the condition until they successfully break evasion.	[{"stat": "power", "value": 1}]			action	{unique}
18	Buster	You can pay for this ability up to 3 times at once to charge up the weapon, modifying it's stats per charge. Use the first, second, or third weapon profile respective to the number of actions used to charge up the weapon.	[{"stat": "actionPoints", "value": 1}, {"stat": "power", "value": 1}]	cybernetica	chromebits	action	{attack,unique}
\.


--
-- Data for Name: Armor; Type: TABLE DATA; Schema: public; Owner: ben_long
--

COPY public."Armor" (id, name, picture, description, stats, price, keywords) FROM stdin;
2	Mk. 3 Industrial Suit	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735946963/gated/svhkzcrpeypdxwb7dgs9.jpg", "publicId": "gated/svhkzcrpeypdxwb7dgs9"}	Designed to protect laborers against hazardous environments.	{"armor": 4, "block": 10, "power": 6, "weight": 10}	15	{"{\\"keywordId\\": 17}","{\\"keywordId\\": 19}"}
10	Body Vest	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735961239/gated/i0il2fv8vy4tc4qsc9su.jpg", "publicId": "gated/i0il2fv8vy4tc4qsc9su"}	Simple and common, used even by civilians in high risk zones.	{"armor": 3, "block": 4, "weight": 4}	2	{"{\\"keywordId\\": 13}"}
\.


--
-- Data for Name: BookEntry; Type: TABLE DATA; Schema: public; Owner: ben_long
--

COPY public."BookEntry" (id, title, content) FROM stdin;
1	introduction	<h1 class="ql-align-center"><span class="ql-size-large" style="font-family: Exo-Regular;">Glam and the&nbsp;</span></h1><h1 class="ql-align-center"><span class="ql-size-large" style="font-family: Exo-Regular;">Electric Death</span></h1><p><br></p><p>\t<span style="font-family: Exo-Regular;">A narratively driven rpg following the lives and eventual deaths of mystical cybernetically augmented gangsters. On the world of Nova Viridian, in an age of interstellar blackout, humans find themselves waking up from the cryosleep of their harbingerous Coffin Ships. The automated piloting system has landed them on a nearly arid world, and their environmental terraforming systems have already begun to convert this dusty world into a paradise like the home they were forced to abandon.</span></p><p><br></p><p><span style="font-family: Exo-Regular;">\tThings begin but do not proceed smoothly. Amongst the early colonies, strange technical mishaps began occurring. Small-scale, fixable – at first. Drones flying in aimless circles in the desert until they overheat and crashland. Food Dispensers failing to cook their food or serve the right item. Sleep pods over or understimulating their users, resulting in insomnia and comas alike. No one had connected these issues for a long, long time. Only once the dreams began in earnest did anyone grow suspicious of a singular cause.</span></p><p><br></p><p><span style="font-family: Exo-Regular;">\tSomeone went down there, into the strangely neat square tunnels that diced and sliced the underside of Nova Viridian. No one knows who, but someone went down there and sparked this whole powder keg. They made contact with the Sleeping Giants, the strange vaguely sapient statues perfectly molded into the earth below, as though they had been present when the planet formed and its only choice was to mold around the foreign bodies. But once contact was made, the human psyche was opened, and the gestalt changed forever.</span></p><p><br></p><p><span style="font-family: Exo-Regular;">\tDreams guided men in those days – to do great things, vile things, tremendous things, evil things. Dreams made men turn on their leaders in fiery, bloody rebellion. Dreams made men rip apart their data archives and kill their scholars. Dreams made men shred their terraformers to pieces when the badlands had not yet burgeoned and only shrubs and small reptiles could match the harsh conditions of the arid world. Dreams scattered men to the corners of the world where they built their neon pyramids and descended to live in their manufactured heights. For decades they built, for centuries they repopulated, and finally the human ecosystem began to reform its predator and prey cycle.</span></p><p><br></p><p><span style="font-family: Exo-Regular;">\tAlong the pyramid walls, shanty towns and blackmarkets are battered by dust and radstorms. Inside the city, violence reigns supreme. Cybernetic gangsters meet in open battle on the streets, armed with rudimentary custom firearms and melee objects of varying original intent. The strongest of these gangs rise above the crop to battle whatever force reigns supreme in their local pond. The Federals, Noblebloods, Corporate Holdouts, and the Church remain in power centuries after their formation, due in part to the scattering of humanity centuries ago. They all possess their own private armies of heavily augmented agents, and will easily stamp out most petty gangs.</span></p><p><br></p><p><span style="font-family: Exo-Regular;">\tAmidst it all, spiritualism and esoteric mysticism pervades each city to its heart. Oracles, exorcists, dreamers, and more all claim to see beyond the material veil to a world where Sleeping Giants and ghosts of the past converge and interfere with the material world. They inscribe cybernetic limbs with esoteric power, and channel the subconscious dreamer to interact with the gestalt psyche of mankind.</span></p>
4	attributes and skills	<h1><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Attributes and Skills</span></h1><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">There are four primary attributes in GatED:</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Cybernetica – Technology and machinery. Affect change through devices.</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Esoterica – Otherworldly and phenomena. Affect change through mysticism.&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Peace – Suaveness, intellectualism. Affect change through cooperation.&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Violence – Roughness and physicality. Affect change through aggression.</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Then, each attribute has its own sublist of skills:&nbsp;</span></p><p><br></p><p><u style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Cybernetica</u></p><p><br></p><ul><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Chromebits – Cybernetic enhancements</span></li><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Hardwired – Machinery and electric grids</span></li><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Motorized – Driving and vehicles</span></li><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Networked – Diving and computers</span></li></ul><p><br></p><p><u style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Esoterica</u></p><p><br></p><ul><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Gestalt – Human shared psyche</span></li><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Godhead – Sleeping Giants, invocations</span></li><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Mysticism – Fortunes, runes, omens</span></li><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Outerworld – Souls, ghosts, phantoms</span></li></ul><p><br></p><p><u style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Peace</u></p><p><br></p><ul><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Barter – Market knowledge and valuation</span></li><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Erudition – Studious knowledge</span></li><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Rhetoric – Speech and wordcraft</span></li><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Treatment – First Aid and medicine</span></li></ul><p><br></p><p><u style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Violence</u></p><p><br></p><ul><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Assault – Close quarters combat</span></li><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Shooting – Gunnery and accuracy</span></li><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Subterfuge – Sneaking and hiding</span></li><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Threshold – Tolerance for suffering</span></li></ul><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Attributes are broad concepts, fittingly, and can be used to categorize characters. They are also often prerequisites to certain feats or items. Skills are a bit more special though, as they represent total ways for players (and characters in general) to experience and view the world. A character can use a skill in any situation (to varying efficacy) and can either apply it to or learn about it contextually from said skill. Here’s an example:&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Damien the Avenger is a Violence mained Assault and Marksman skill user. In other words, he’s a doorkicker and a nametaker.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Martõn the Mystic is an Esoterica mained Mysticism and Gestalt skill user. He’s the voodoo man, and strange is his game.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Split Tully is a Cybernetica mained Motorized and Chromebits skill user. He’s the driver of the team’s custom racer.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Upon entering a rival hashden, they each alert the GM that they’d like to take in their surroundings (Damien says, “I wanna know what the fuck is going on”) with their favored skills.&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Damien rolls Assault.</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Martõn rolls Mysticism.</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Split rolls Chromebits (He was talked down from rolling Motorized.)</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Damien counts the number of producers and guards in the room. He plots routes through the furniture. He draws his prized pneumatic mace.&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Martõn expands his mind and detects the reinforcements upstairs, and learns as well that this hash is laced with that esoteric powder they’ve been pursuing.&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Split picks out a few augmented guards and alerts Damien to their ‘stats’. He also sees a makeshift workstation in the corner, implying one of these goons is a real chromehead.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">In this example, we see each character is using the skill as a means of perception and conceptualizing. GatED skills can be summarized as follows: “When all you have is a hammer, everything starts looking like a nail.” Characters see the world through a limited lens, just like people, and their habits and traits shape their perception of things. Player characters are thus encouraged to round themselves out, by taking other skills to represent lesser vectors of their character, and should often use those skills in conjunction with their main skill or two. While only one roll can be made at a time, a character can certainly spend extra time taking a varied stock of the situation.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">What if a player wants to use an out of place skill? Generally, the GM can let them, while also telling the player that they may have decreased efficacy or increased risk. In specific situations, the GM may decide that the roll cannot be replaced, or at least cannot be replaced by the player’s current suggestion. Here’s another example:&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Damien is interrogating one of their rivals after a brutal slaughter in the hashden. The rival spills some beans, and the GM asks Damien to make an Erudition Check to confirm if the information is sensible. Damien’s Peace is 0. Damien’s Erudition is 0. Damien asks the GM if he can make an Assault Check to really beat the truth outta this goon. The GM furrows his brow, but relents by telling Damien that he can, but the risk for failure is incapacitating the guy, and that the efficacy of success is limited compared to the Peace Roll.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Damien flat out fails and clocks the dude. He shrugs and never considers how big the mechanical implications of this situation actually were.&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Finally, and obviously, Skills can simply be used to perform the action described by them. Assault can hit, Motorized can drive, and Rhetoric can filibuster. </span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">&nbsp;Attributes and Skills (cont.)</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Let’s take a moment here and break down the attributes and skills individually. Let’s start with:&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Cybernetica - Interacting with machinery and technology, and using such devices for action and change. Knowledge regarding engineering and specifications.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Esoterica - The supernatural, and its usage. Learning mystical facts and things detached from the material world. Using supernatural abilities that stem from the mind and the things behind the veil.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Peace - The ability to enact things by words or ideas. Applying the social system as it’s meant to function. The softer hand of action, changing minds coaxing information.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Violence - The ability to enact things by force. Whether aggressive, calculated, or somewhere chaotically in between, violence represents force and often physical action.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">So we can see that although not mutually exclusive, these skills can be arranged as perpendicular spectrums. Violence and Peace, Cybernetica and Esoterica.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Of course, these broad categories are a great way to quickly categorize characters, and players should put points into an attribute knowing that there will be perks and items with Attribute based prerequisites. But the real meat of the game and of its characters comes from the following, skills:&nbsp;</span></p><p><br></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Cybernetica Skills</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Chromebits - Cybernetic augments, body replacement, nanotech. Enhanced biology, cellular augmentation, brainchips and neurotech. Using the technology as well as knowing it.&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Identifying cyberenhanced individuals, as well as their capabilities. Identifying relevant weaknesses in a system.</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Hardwired - Traditional machinery and electronics. Surveillance, drones, explosives, and other military tech. Appliances, radio, jerry-rigging, ‘analogue tech’. Electricity and power grids, security, infrastructure.&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Identifying power discrepancies, analyzing opposing security measures, recalling structural information</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Motorized - Vehicles, motors, roads, highways, and street laws. Anything on the ground, in the sea, or in the air. Knowledge of and ability to operate. Fingerless gloves. ETAs, shortcuts, and special maneuvers.&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Identifying cars by sound, aerial vehicles by sound or wash. Planning intercepts on highways, streets. Dead ends and cutbacks.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Networked - Computers, digital devices, cellphones, wireless information, bugs, viruses, wyrms, hacking, digital security. Full Immersion Diving, remote hacking. Digital systems and AI.&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Tracking power and thermal activity, finding hubs and more. Tracking anonymous users, deciphering personal information. Preventing digital incursions and protecting private faculties.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Esoterica Skills</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Gestalt - Shared human psyche, subconsciousness, mental links, telepathy, thought inception. Area empathy, local psychic avatars.&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Awareness of emotional spikes, psychic states, and ongoing inceptions, and other gestalt activity.</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Godhead - The Sleeping Giants, the age before man, the stars, the dreamworld. The endtimes, godly influence and resisting it. Inducing or channeling astral thought. Multidimensional benders. Celestial alignment.&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Awareness of portals to the dreamworld, Sleeping Eyes, Watchers, and more. Knowledge of dreams and dissecting their content.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Mysticism - The Binding Art, spiritualism, tradition, fortunetelling, farsight. Defend against and ward off the other Esoterica. Bind and seal locations of interest. Runes, Ofudas, totems, and other primitive objects contain spiritual power.&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">A light awareness of the presence of all kinds of Esoterica, but less specific about their ongoings. Knowledge of the secret languages and codes of the various Mystic Communities, and a more welcome embrace by those communities.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Outerworld - What remains after death. Trapped spiritual essence, haunting ghosts, possessing phantoms. The awareness of such things, and the ability to use them. Minor possessions to be used, major possessions carry risk. How to exorcise or contain ghosts of any kind.</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Awareness of ghostly apparitions, knowledge of their kind and effects they have. Perception of looming imminent death.&nbsp;</span></p><p><br></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Peace Skills</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Barter - The universal tongue, money. All things value, trade, bartering, mercantile. Pawning things, identifying market items. Running calculations. Constructing deals, paperwork, agreements. Dealing with a single ramen vendor or a Corporate Executive alike.&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Costs, income, liquid and solid asset comparison. Logistics, real estate.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Erudition - Knowledge, studiousness, encyclopedic recall. Mental logic, abstract concepts, history, culture, art and the like. Modern media and past literature. Relating all of the previous subjects as well as understanding them. Book knowledge. Raw data.&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Perceiving intellect, reading through massive amounts of information, comparing information received for trustworthiness.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Rhetoric - Speech, the great mover of the masses. Lying, politics, diplomacy, surrender, charm and more. Listening to others speak, identifying speech patterns and inconsistencies in other’s voices. Mimicry and performance.&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Picking out keywords in unknown languages. Getting a feel for a crowd. Social empathy.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Treatment - Medical services and knowledge. First aid, surgery, wound care, sickness, side effects. Clinical knowledge about pharmaceuticals. Steady hands and calm nerves. Biological knowledge.&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Examinations, determinations of conditions. Segues into cybernetic identification (by comparison to biology). Identification of drugs or combat stimulants in an individual.&nbsp;</span></p><p><br></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Violence Skills</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Assault - Fisticuffs, hammers, blades. Anything up close and personal. Threatening people with violence. Breaking things. Breaking down things. Breaking apart things. Grappling, kung fu, and tackles. Using your muscles, throwing something, coaxing out speed. Certain firearms.&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Planning routes, noticing an opponent’s strength, contemplating outgoing damage and returning damage.</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Shooting - Gun. Shot, slung, launched, or otherwise using a projectile. Threatening people… with guns! Blasting things, suppressing fire, sniping, called shots. Most firearms.&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Planning shots, identifying firing locations, recognizing caliber by sound, examining armor or point defense systems.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Subterfuge - Sneaking, hiding, quiet kills, vital strikes. Physical deception, feints, parries. Remaining in an awkward place. Fakeouts, false documents, disguises. Infiltration and information gathering. Eavesdropping.&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Taking stock of guards and security systems. Planning points of ingress and egress. Tracking or taking note of someone.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Threshold - Pain tolerance, endurance, and physical limitations. Drugs, damage, fatigue, poison, and alcohol. Cybernetic limitations, bodily strength, immune health. Simple feats of strength, torque not acceleration, climbing, running, swimming.&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Taking stock of injuries, medical condition. Bodily knowledge, awareness of foreign agents. Contemplating possible damage, identifying certain substances by experience.&nbsp;</span></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">So, that’s skills. They’re varied, and wide. Go with your gut. If you think trying to eat a tire is a Violence Threshold check, then send it. If you think someone can be intimidated by an Esoterica Godhead check, as the Religious man spouts off about the apocalypse of the universe, then absolutely. What you should be most aware of is Toe Stepping. With such a flexible system, you, the GM (and you players), need to make sure that certain skills don’t invalidate others, or that player archetypes are clearly defined. (No, you can’t make a Violence Assault check to punch the bookshelf until the book you need falls out. Ask Viggo the Erudite to come help you.)</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">As an endcap to skills, let me address the players. GMs should be thinking about this, but the players really need to envision this. Your skills are not just the things your character does, it’s their worldview. Their archetype. It’s the very nature of the character. Someone whose highest rated skill is Assault should tie that into the character description and behavior. (He’s a lithe assassin, with blades hidden in various places all over his body and a long beruned katana on his hip.) Or. (He’s a brick of a human, square as his two handed pneumohammer.) For both players and GM, designing characters which visually represent their skills is both satisfying and mechanically advisable. The GM doesn’t have to give everything away, (Thin lines tracing her jaw give away her advanced prosthetics, but little can be discerned about them.) but knowing that a character is maining Cybernetica the moment you meet them allows for planning, and when RPG players begin to plan, tension is bound to occur.&nbsp;</span></p>
20	mechanics	<h1 class="ql-align-center"><strong class="ql-size-large" style="background-color: transparent; color: rgb(255, 255, 255); font-family: Exo-Regular;">Mechanics</strong></h1><p><br></p><p><span style="color: rgb(255, 255, 255);"> </span><span style="color: rgb(255, 255, 255); background-color: transparent; font-family: Exo-Regular;">In </span><em style="color: rgb(255, 255, 255); background-color: transparent; font-family: Exo-Regular;">GatED</em><strong style="color: rgb(255, 255, 255); background-color: transparent; font-family: Exo-Regular;">, </strong><span style="color: rgb(255, 255, 255); background-color: transparent; font-family: Exo-Regular;">characters possess four attributes, and each attribute possesses four skills. Each roll made by any character will be in the form of Attribute Dice + Skill Dice. </span><em style="color: rgb(255, 255, 255); background-color: transparent; font-family: Exo-Regular;">GatED </em><span style="color: rgb(255, 255, 255); background-color: transparent; font-family: Exo-Regular;">uses </span><strong style="color: rgb(255, 255, 255); background-color: transparent; font-family: Exo-Regular;">six sided dice </strong><span style="color: rgb(255, 255, 255); background-color: transparent; font-family: Exo-Regular;">because they’re cool and nice. In general, a roll will have a Target Number of successes (TN), most commonly 1, and may often include bonuses for additional successes. Even successful actions may come with hazards or downsides.</span></p><p><br></p><p><span style="color: rgb(255, 255, 255);"> </span><span style="color: rgb(255, 255, 255); background-color: transparent; font-family: Exo-Regular;">If a rule ever references “your TN”, it’s equal to the rating of the Skill that you’re utilizing. (Not the rating and the attribute!) There are also Dice Conditions that can apply to your rolls, both </span></p><p><span style="background-color: transparent; color: rgb(255, 255, 255); font-family: Exo-Regular;">positively and negatively. More on those later.&nbsp;&nbsp;&nbsp;</span></p><p><br></p><p><img src="https://res.cloudinary.com/dm4tmla72/image/upload/v1736108604/gated/axkvcszfx6qnb9c5ffjg.jpg" style="display: inline; float: left; margin: 0px 1em 1em 0px; cursor: nesw-resize;" width="291"></p><p><span style="color: rgb(255, 255, 255);"> </span><span style="color: rgb(255, 255, 255); background-color: transparent; font-family: Exo-Regular;">Attributes and skills are the representation of character more than just action. They’re perception, contemplations, and abilities. They’re the fundamental driver of character action and development.&nbsp;</span></p><p><br></p><p><span style="color: rgb(255, 255, 255);"> </span><strong style="color: rgb(255, 255, 255); background-color: transparent; font-family: Exo-Regular;">Injuries </strong><span style="color: rgb(255, 255, 255); background-color: transparent; font-family: Exo-Regular;">are severe and </span><strong style="color: rgb(255, 255, 255); background-color: transparent; font-family: Exo-Regular;">death </strong><span style="color: rgb(255, 255, 255); background-color: transparent; font-family: Exo-Regular;">is inevitable. Gangers live fast and die young, leaving behind their stories and a wake of violence.</span></p>
24	dice pools and rolls	<h1><span class="ql-size-large" style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Dice Pools and Rolls</span></h1><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">So, we have our attributes known and our skills read. Now we need to understand how to use them. Every character assigns values to their attributes and skills. Each of those numerical values becomes the character’s dice pool when attempting a Check or a Roll (used interchangeably depending on my inebriation). Any time a roll is called for, gather the Attribute Dice and the Skill dice. GatED uses six sided dice, or D6’s, because they’re common and they feel nice. I said that already.</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">So, the GM calls for a roll in the form of “Attribute Skill” roll, or check. “I need a Violence Threshold check to hold in that burp, buddy.” Sometimes, substituting an attribute for another might make more sense. “I need a Peace Threshold check to hold in that burp, buddy.” This isn’t how the system works. Attributes govern skills, they remain associated with the skill in all situations. Buuuuuuuut… There’s nothing stopping you from doing that if you like. Let’s call it an optional feature.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">The player then picks up a number of dice equal to his attribute, a number of dice equal to his skill, (maybe some extra dice), and rolls em. If a dice rolls a 5 or a 6, it’s considered a success. In most circumstances, one success does the trick. Other times, a Target Number (TN) of successes or a contest between two parties is necessary.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Some actions can have gradient success conditions. One success may be enough to accomplish the desired effect, but two (or more) successes handles it flawlessly. During Narrative Play, the GM is free to assemble these gradient successes at their leisure. “You can attempt to climb the fence, but there’s barbed wire at the top, making it more dangerous and difficult. One success, you take one damage. Two or more, no damage. Either way, you get to the other side.”</span></p><p><br></p><h2><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Dice Conditions</span></h2><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Some traits will interact directly with the dice pool or the act of rolling.&nbsp;</span></p><p><br></p><ol><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);" class="ql-size-extra-small">Booming: Dice that roll a 6 grant an additional success. (Can Stack)</span></li><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);" class="ql-size-extra-small">Dooming: Dice that roll a 1 subtract a&nbsp;success from the final result. (Can Stack) </span></li><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);" class="ql-size-extra-small">Lucky: Dice succeed on 4, 5, and 6.</span></li><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);" class="ql-size-extra-small">Unlucky: Dice only succeed on 6.</span></li></ol><p><br></p><h2><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Multiple Conditions</span></h2><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);" class="ql-size-extra-small">Booming and Dooming can both be active at once, but Lucky and Unlucky cancel each other out. Multiple instances of reroll can stack on different numbers, and any given dice can still only be rerolled once.&nbsp;</span></p><p><br></p><p><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Summary</span></p><p><br></p><ul><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Roll dice equal to attribute + skill.</span></li><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">A 5 or a 6 on a dice is a success.</span></li><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Target Number of successes required.&nbsp;</span></li><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Success may be a gradient.&nbsp;</span></li><li><span style="font-family: Exo-Regular; color: rgb(255, 255, 255);">Dice Conditions interact with the roll.</span></li></ul>
\.


--
-- Data for Name: Character; Type: TABLE DATA; Schema: public; Owner: ben_long
--

COPY public."Character" (id, "userId", level, profits, stats, picture, height, weight, age, sex, background, attributes, "firstName", "lastName") FROM stdin;
2	2	6	10	{"injuries": 0, "insanities": 0, "currentHealth": 14, "currentSanity": 5}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735868801/gated/l6wiy8v2t8si4elltyjh.png", "publicId": "gated/l6wiy8v2t8si4elltyjh"}	70	175	35	Male	The most fearsome netrunner of IP-6	{"violence": {"points": 2, "skills": {"threshold": {"points": 2}}}, "cybernetica": {"points": 4, "skills": {"hardwired": {"points": 2}, "networked": {"points": 4}, "chromebits": {"points": 3}}}}	Ban	Chu Nen
3	2	4	10	{"injuries": 0, "insanities": 0, "currentHealth": 18, "currentSanity": 5}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735870040/gated/wmco9g3vbc8jhzdjvqlp.jpg", "publicId": "gated/wmco9g3vbc8jhzdjvqlp"}	76	220	33	Male	Big buff guy.	{"peace": {"points": 1, "skills": {"treatment": {"points": 2}}}, "violence": {"points": 3, "skills": {"assault": {"points": 3}, "threshold": {"points": 4}}}, "cybernetica": {"points": 2, "skills": {"chromebits": {"points": 3}}}}	Jax	Crimson
1	2	4	10	{"injuries": 0, "insanities": 0, "currentHealth": 16, "currentSanity": 5}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735866779/gated/x1vpxctuec168m0acfik.jpg", "publicId": "gated/x1vpxctuec168m0acfik"}	72	180	30	Male	I was born and raised in one of the lowest sectors of the city, and in addition to that, my upbringing wasn’t exactly what you would call happy or comfortable. I was born with a nervous system gone haywire, and if not addressed soon after my birth, I would have gone braindead in a matter of days. This kind of problem could only be fixed with chrome.\n\nBeing from one of the lowest sectors in the city, my parents were barely scraping by to survive. Affording chrome was out of the question. My father, now searching desperately for a way to save my quickly decaying body, came into contact with a wealthy man high in the power hierarchy of the corporate holdouts during his search. The details of why are unclear to me, but through this interaction an agreement was struck. My parents were to devote their lives to this man in servitude and slavery, lending themselves to any work or whim he desired and in exchange he would fund the necessary chrome that would save my life.\n\nMy parents delivered by small body along with the chrome to the doorstep of my sector's local ripperdoc before being ripped away from me and shipped off to only the sleeping giants know where. Upon the discovery of my body, the ripperdoc hurriedly installed my newly acquired chrome out of what I can only assume would be either pity or the morbid curiosity to see a cybernetically enhanced baby. Either way my life was saved. The power requirements of the installed chrome were enough to sap my body of its excess neural activity, restoring my brain to normal functioning activity.\n\nEver since that day, the ripperdoc has not exactly been caring for me, but lending me a hand when necessary and updating my chrome to fit my body as I age. I assume I keep his interest as his ongoing cybernetic experiment. None the less, he has never done me wrong and I can only be thankful for his part in my existence.\n\nAt a young age, with no one providing for my everyday needs, I had to learn the skills necessary for survival in the city. With no money and nothing to my name, my only option for survival was through crime. Myself and some other misfits throughout my sector would routinely conduct small scale heists, pilfering survival supplies and maybe a little extra money along the way. Given my negative disposition to the corpos, we aimed our efforts at sapping whatever we could manage from their pockets.	{"peace": {"points": 1, "skills": {"barter": {"points": 1}}}, "violence": {"points": 2, "skills": {"shooting": {"points": 2}, "threshold": {"points": 3}}}, "cybernetica": {"points": 3, "skills": {"motorized": {"points": 1}, "networked": {"points": 2}, "chromebits": {"points": 4}}}}	Uni	Dori
\.


--
-- Data for Name: Cybernetic; Type: TABLE DATA; Schema: public; Owner: ben_long
--

COPY public."Cybernetic" (id, name, "cyberneticType", stats, picture, description, body, price, keywords) FROM stdin;
12	Mazer Beam Cannon	offensive	{"cyber": 4, "power": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735965244/gated/twskj0rcgtgwrvmabwug.jpg", "publicId": "gated/twskj0rcgtgwrvmabwug"}	An energy weapon that laughs in the face of industry bottlenecks. Neutrino Mass Limitations? Ion Field Collapse? Electromagnetic Dispersion? Ha. This energy cannon functions like a normal hand until you choose to use it as a weapon. It can also change back for free. You can spend one or more actions to charge and shoot it. You may roll Cybernetica: Chromebits to shoot.	{Arm}	\N	\N
8	Kessl E-Med System	defensive	{"cyber": 2, "power": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735965959/gated/r4e6dnzq4lwmhaz646wa.jpg", "publicId": "gated/r4e6dnzq4lwmhaz646wa"}	An adrenal pump plus neuro stimulant jack. Cognitive reaction enhancement and neuromuscular reflex activation.	{Spine}	14	\N
7	Fire Retardant Skin	defensive	{"cyber": 2, "power": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735966242/gated/ot09jq4j3wpi3awbynrk.jpg", "publicId": "gated/ot09jq4j3wpi3awbynrk"}	Nonreactive thermoablative foam secretes, hardens, and sloughs off seconds later. For when you want to set the world on fire and watch it burn.	{Skin}	13	\N
14	El Sandorino	function	{"cyber": 5, "power": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735972159/gated/iye8rjrwzfwqbior9nhl.jpg", "publicId": "gated/iye8rjrwzfwqbior9nhl"}	When you see a man moving faster than possible, with bloodshot eyes and hemorrhages coming out of his nose and ears, trust that it’s a Sandorino. Pump the nervous system so fulla juice it could burst; but if it doesn’t, the user gets to move, see, and think faster than they ever have before.	{Brain,Spine}	25	\N
10	Kenjio Mk. 1	offensive	{"cyber": 2}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735929896/gated/k7a8zbouvyq6xngkobjj.jpg", "publicId": "gated/k7a8zbouvyq6xngkobjj"}	A subdermal compartment conceals a hidden blade. You can attack with the blade mounted in your forearm without using your hand; this attack may roll Cybernetica: Chromebits.	{Arm}	13	{}
11	T-90 Electro-Knuckles	offensive	{"cyber": 2, "power": 3}	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735933456/gated/b2pd4zpvib5nnkdshcxx.jpg", "publicId": "gated/b2pd4zpvib5nnkdshcxx"}	Conducting plates and rods through the hands, plus insulating materials, power dynamos… The punch only a genius could create. \nYou may use Cybernetica: Chromebits instead of Violence: Assault to roll for Unarmed Attacks and the Mastery keyword effect. When performing an Unarmed Attack, use the weapon profile below.	{Hands}	15	{}
\.


--
-- Data for Name: Keyword; Type: TABLE DATA; Schema: public; Owner: ben_long
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
13	armor	Armor	Armor is worn when equipped. It has a limited ability to intercept damage from incoming attacks.
14	armor	Deflector Field	This armor is unaffected by the Anti-Armor and High Impact keywords.
15	armor	Dispersive	Blast damage is reduced by an additional 2 points. While you have BP, you cannot be concussed.
16	armor	Energized Plating	Anti-Armor attacks have their damage reduced by 2. Negates High Impact.
17	armor	Power	This suit is self propelled and fueled by an onboard battery. While the suit has Power (PWR), it treats its weight as 0, and can use special abilities. You cannot wear multiple types of armor while wearing power armor.
18	armor	Ready Judge	You can expend 1 power as a free action to utilize the suit’s auto stabilizers and onboard AI adjutant. Then you can brace a Heavy Weapon while standing and fire two salvos per turn. You retain this benefit until you move or unlock.
19	armor	Torque	Consume 1 power. Once per turn, as a free action, add +2 dice to any assault or threshold check, except flurries.
20	weapon	Cybernetic	A weapon that is built into a cybernetic augment. A cybernetic weapon does have a weight or price value associated with it. When attacking with this weapon (unless otherwise specified), you may roll Cybernetica: Chromebits instead of Violence: Assault for melee weapons or Violence: Shooting for ranged weapons.
28	weapon	Backblast	When you attack, a character 5 feet behind you takes 2 damage.
21	weapon	SMG	Fire rate and compact size make for a relatively easy to use platform. Attacks with an SMG within 3 tiles (15 feet) gain Booming.
22	weapon	Rapid-Fire	This weapon adds an additional +X dice when performing a Salvo attack.
24	weapon	HW	Beastly weapons that test strength and skill alike. Heavy Weapons must be Braced before firing. Equipping a Heavy Weapon reduces your speed by 2. Reloading one requires two actions.
25	cybernetic	Prototype	A special class of cybernetic, describing augments which never saw a mass market release and have extremely limited public exposure. Be it because of danger, unpredictability or any other reason, these augments have been kept hidden from the public eye. Use of them is sure to turn heads and attract attention, both wanted and unwanted. Only available through the Proto-chrome perk.
26	weapon	Spray	A spray weapon cannot attack beyond its listed range. A Spray weapon selects a target; all characters adjacent to and in a line between you and the target are targeted. Roll once. Some weapons may not list a range; in that case, the weapon’s maximum range is listed after the Spray. Spray Heavy Weapons can be braced while standing. Firing a Spray weapon is always a salvo attack.
27	weapon	Chaining	When a Chaining weapon is fired, you may select an additional character adjacent to the targeted character to receive damage equal to the damage incurred by the primary target. Roll once. Firing a Chaining weapon is always a salvo attack.
29	weapon	Backdraft	After attacking, you may expend 1 shot from its magazine; compare the roll against all characters within 1 tile of (you and the target). On a hit, give the targets the Burning X condition.
30	weapon	Barometry	After attacking, you may expend 1 shot from its magazine. On a hit the target receives the Bleed X and Slowed X conditions.
31	weapon	Blast	This attack deals half damage to all characters within X tiles of the target. Only the initial target is affected by Anti-Armor. If the attack roll misses, the target is still damaged by the blast (half damage).
32	weapon	Cloudkill	After attacking or parrying, you may expend 1 shot from its magazine; Compare the roll against any adjacent target. On success it deals X damage, Anti-Armor.
33	weapon	Bolt-Action	After firing this weapon, an action must be used to work the bolt before it can be fired again.
34	weapon	Concuss	A successful attack grants a stack of Concussion. At 2 stacks, the target is Stunned 2.
35	weapon	Detonate	After successfully hitting a target, this attack deals a separate instance of damage equal to the rating.
36	weapon	Incendiary	This weapon applies Persistent Damage: Burning X.
37	weapon	Jams	This weapon’s rolls have Dooming.
38	weapon	Lateral Blast	When you attack, characters directly to your right and left take 1 damage.
39	weapon	Launcher	This weapon’s stats are determined by what ammo it uses. It can target its shots separately during a salvo. It can be braced while standing. Loaded ammunition does not count towards your weight.
40	weapon	Needle	You can apply poisons and similar substances to this weapon’s attacks. 1 dose of poison applies to 1 salvo’s worth of ammo.
41	weapon	Reach	This melee weapon has range.
43	weapon	Shocking	This weapon applies Persistent Damage: Shocked X.
44	weapon	Silent	This weapon does not make enough noise to attract attention unless the listener is within 30 feet.
45	weapon	Stormsurge	After attacking, you may expend 1 shot from its magazine. The attack receives Shocking X, but triggers for every character within 10 feet of you and the target.
2	weapon	1H	This weapon requires 1 hand to make an attack, thus you can wield two at once. Dual Wielding may increase Flurry and Salvo Ratings (pg. 71) but suffers from the 2H penalties listed below. 1F weapons require a leg, and thus do not require nor benefit from hands.
\.


--
-- Data for Name: Perk; Type: TABLE DATA; Schema: public; Owner: ben_long
--

COPY public."Perk" (id, name, description, requirements) FROM stdin;
21	Old Ways	Your vehicles gain +50% of their Cargo Space as a bonus Concealed Space. Any Cargo in this space has +2 to the TN to be noticed by any kind of inspection.	{"cybernetica": {"points": 0, "skills": {"motorized": {"points": 2}}}}
1	Etched Infant	Some children are born in turmoil. Shanty tribes and nomad packs tattoo these children with runes. You gain +1 Ward permanently.	{"esoterica": {"points": 0, "skills": {"mysticism": {"points": 3}}}}
2	Benefactor	When you select this perk, you receive a non-blackmarket cybernetic of your choice. If it is ever destroyed or damaged, it is repaired or replaced for free. Every time your Upgrade Level increases, you receive another cybernetic. These cybernetics are personalized to you, and cannot be shared.	{"cybernetica": {"points": 0, "skills": {"chromebits": {"points": 3}}}}
6	Born to Chrome	You gain one Perma-Chrome slot. This slot allows you to equip a Cybernetic without counting its cyber cost.	{"cybernetica": {"points": 0, "skills": {"chromebits": {"points": 3}}}}
7	Chromed Out	You gain +2 Cyber points. When all of your cyber points are being used, attempts to intimidate using Chromebits gain Lucky.	{"cybernetica": {"points": 0, "skills": {"chromebits": {"points": 1}}}}
8	Mass Default	Once per scene, you may take an augmented Reload Action; doing so reloads and refreshes all cybernetics (as long as munitions/cells are available) in addition to the normal effects.	{"cybernetica": {"points": 0, "skills": {"chromebits": {"points": 2}}}}
9	Proto-Chrome	When you select this perk, you receive 1 of 4 unique cybernetic augments. They are listed in the cybernetic section “Prototype Augments”. You or a trusted associate are able to repair or rebuild this cybernetic if it is damaged or lost.	{"cybernetica": {"points": 0, "skills": {"chromebits": {"points": 4}}}}
10	The Flesh is Weak	Once per day, when you become Wounded, you take an extra turn after the current one ends. You still have your normal turn in initiative order.	{"cybernetica": {"points": 0, "skills": {"chromebits": {"points": 3}}}}
11	APM’s	You can use the Command action twice in one turn. (Not for free)	{"cybernetica": {"points": 0, "skills": {"hardwired": {"points": 3}}}}
12	Brigade Tactics	When you issue a command, all viable targets within a 3 tile radius receive and follow it.	{"cybernetica": {"points": 0, "skills": {"hardwired": {"points": 4}}}}
13	Guerrilla Pattern	You can use the Jury Rig action to create Shields, Frag, Incendiary, and Smoke Grenades, or Gas Masks. Select one, then roll Hardwired, making up to that many copies of your chosen item. You may attempt this roll once per scene.	{"cybernetica": {"points": 0, "skills": {"hardwired": {"points": 2}}}}
14	IFF Redux	You can use Rewire to undo the targeting parameters of a turret, drone, or similar automated hardware. This causes the object to treat your enemies as hostile and your allies as friendlies.	{"cybernetica": {"points": 0, "skills": {"hardwired": {"points": 2}}}}
15	Old Grids	When rolling to navigate the sewers or city, you may always use Hardwired. If you do, your rolls gain Lucky.	{"cybernetica": {"points": 0, "skills": {"hardwired": {"points": 1}}}}
16	Product Blindspot	When attempting to avoid surveillance systems, you may roll Hardwired instead of Subterfuge.	{"cybernetica": {"points": 0, "skills": {"hardwired": {"points": 2}}}}
17	Rerouting	When one of your mounted drones or cybernetics runs out of power, you can reload its power cell as a free action by draining another device’s PWR.	{"cybernetica": {"points": 0, "skills": {"hardwired": {"points": 1}}}}
18	Systemic Mapping	Accessing a facility’s electronic hardpoint allows you to map out the entire electrical grid, giving you a rough estimate of all points of electrical interactivity.	{"cybernetica": {"points": 0, "skills": {"hardwired": {"points": 2}}}}
19	Firing Platform	Your passengers do not suffer vehicle related penalties to shooting attacks while you’re driving the vehicle.	{"cybernetica": {"points": 0, "skills": {"motorized": {"points": 1}}}}
20	Jump Maneuver	You’re able to identify objects or positions that will jump your vehicle. Generally, the distance you can jump is an amount of feet equal to (5 - Vehicle Size) x (Current Speed in MPH).	{"cybernetica": {"points": 0, "skills": {"motorized": {"points": 3}}}}
22	Parallel Maneuver	If your pursuers have temporarily lost sight of you, you can make a motorized check to immediately park and hide your vehicle on a success (there must be an appropriate hiding opportunity).	{"cybernetica": {"points": 0, "skills": {"motorized": {"points": 2}}}}
23	PIT Maneuver	When ramming an enemy vehicle using Motorized, you may instead PIT them. If you succeed, force the enemy driver to roll Motorized. On a success, their speed is reduced to 0 until the end of their next turn. On a failure, their vehicle crashes.	{"cybernetica": {"points": 0, "skills": {"motorized": {"points": 2}}}}
24	Rote and Practice	When performing a maneuver, your rolls are Booming.	{"cybernetica": {"points": 0, "skills": {"motorized": {"points": 3}}}}
25	Coerced Malfunction	When afflicting an enemy with a Malfunction, you may choose which one.	{"cybernetica": {"points": 0, "skills": {"networked": {"points": 2}}}}
26	Cowboy Junkie	Add your Networked rating to your Cyber.	{"cybernetica": {"points": 0, "skills": {"networked": {"points": 1}}}}
27	Glitch Parade	When the duration of a Malfunction ends, the target is immediately affected by a different random Malfunction. Can only affect a target once per scene.	{"cybernetica": {"points": 0, "skills": {"networked": {"points": 3}}}}
28	Godfather	You have earned the support of a Rogue AI, so long as you remain in its favor. Once per session, you can call upon the AI to aid you. For the remainder of the scene, whenever you apply a Wyrm or Malfunction to a target, the Godfather applies a copy to another viable target you’re aware of.	{"cybernetica": {"points": 0, "skills": {"networked": {"points": 4}}}}
29	Neural Null	Perform an Upload: if successful, remove a condition originating from cybernetic, networked, or other digital/robotic means from a target.	{"cybernetica": {"points": 0, "skills": {"networked": {"points": 1}}}}
30	Scorched Earth	Whenever a character successfully hacks you (Upload, etc.) you can choose to cause you and the target to lose Sanity equal to your Networked Rating.	{"cybernetica": {"points": 0, "skills": {"networked": {"points": 2}}}}
31	Voices in the Code	Whenever you successfully Upload a Wyrm or a Malfunction into a target, they lose 1 sanity.	{"cybernetica": {"points": 0, "skills": {"networked": {"points": 3}}}}
32	Wyrm Grafting	When you perform a Malfunction, you have a 1 in 3 chance of refilling an expended Wyrm Shell.	{"cybernetica": {"points": 0, "skills": {"networked": {"points": 2}}}}
33	Figmentary	When using the Insertion Action, you can create auditory illusions instead of dealing damage. You can also use it on an unconscious target to create imperfect or incomplete false memories. (You cannot erase what you and your gang just did, but you can disguise and mislead it.)	{"esoterica": {"points": 0, "skills": {"gestalt": {"points": 2}}}}
34	Mass Hypnosis	You may use Esoterica Gestalt instead of Peace Rhetoric when performing Crowdwork. Reputation losses associated with this (See Rhetoric) are doubled.	{"esoterica": {"points": 0, "skills": {"gestalt": {"points": 1}}}}
35	Mind Fortress	You are either trained or naturally resistant to Esoteric effects. Your TNs against such rolls receive +1, and your rolls against such effects are Booming.	{"esoterica": {"points": 0, "skills": {"gestalt": {"points": 2}}}}
36	Overreach	Double the range of any Gestalt ability or effect.	{"esoterica": {"points": 0, "skills": {"gestalt": {"points": 2}}}}
37	Psychic Artillery	You can take the Psy-Brace action, which functions the same as the Brace action (but can be done while standing), but “braces” your Psychic Salvo. While braced, Psycho Salvo becomes 2H, but adds +2 salvo and +1 damage.	{"esoterica": {"points": 0, "skills": {"gestalt": {"points": 2}}}}
38	Psydiving	When performing Psyreading, you can enter a comatose state to enter their mind. While in this state, your body is asleep but your mind can plumb a target’s memory to learn their secrets. You can experience any unguarded memories, but secrets require a contested Gestalt Roll.	{"esoterica": {"points": 0, "skills": {"gestalt": {"points": 3}}}}
39	Rip and Tear	Once per battle, after using Insertion and dealing Sanity damage, you can use your reaction to tear your way out of their mind, dealing the same amount of sanity damage again in one instance.	{"esoterica": {"points": 0, "skills": {"gestalt": {"points": 3}}}}
40	Scream	Roll Gestalt against all characters within 30 feet of you, dealing Sanity damage equal to your Gestalt Rating to all that are struck.	{"esoterica": {"points": 0, "skills": {"gestalt": {"points": 1}}}}
41	Church of Recitation	You can quote deliberate passages when using Exposure. You still do not know how a man will react to them. Roll twice on the Exposure table and choose one. Reroll Doubles.	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 2}}}}
42	Deja Vu	Sometimes, you experience things before they happen. Once per session, you may claim about 5-10 seconds of time to rewind, returning to just before the sequence of events, which plays out like normal save for your interaction, as you recall the sequence from your dreams.	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 4}}}}
43	Dream Mass	Once per day, you can enter a sleepy trance, where you slip between the dream and real world. You wander aimlessly for 1 hour. Afterwards, restore your sanity points and return to Sane.	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 2}}}}
44	Mirror of Spinning Glass	Once per day, make a Godhead check; you can create a number of illusory images equal to the successes rolled. Each image can be of any character. When targeting a character with an illusory image, the attacker must succeed on a Godhead check (TN = # of target’s images). If they fail, they attack an image, destroying it upon dealing damage. If they succeed, they attack the target as normal.	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 3}}}}
45	Gnomic Obstruction	Coax the little creatures that live in the places that men cannot see. Once per scene, make a Godhead check. If successful, you grant a weapon the Jams trait until or unless it is sanctified.	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 1}}}}
46	Portaling	You may use Godhead to discover the locations of portals, or Sleeping Eyes,  spread throughout the world. Upon finding one, you can attempt to force your waking body through it. Make a Godhead Check, with a TN decided by the GM (based on the destination). On a success, you end up at the Portal’s destination. On a failure, you may end up at any portal, and may be unable to immediately travel back through.	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 2}}}}
47	Revelation	Take 1 Sanity Damage, increased by 1 for each use per Session. Receive Divine Inspiration, information that will keep you alive and (usually) out of captivity, but may not always be “good”.	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 2}}}}
48	Witness a Thousand Yesterdays	Once per day, contest the target with Godhead (line of sight). You grant them Stunned X, where X is the amount of Successes you exceed them by.	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 3}}}}
49	Gnostic Piety	You can reference your Godhead instead of your Mysticism when calculating Sanity.	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 2}}}}
50	Children of Folds	Wring from tiny spaces little rodent-like dreamcreatures that are said to originate from inside the Sleepers’ minds. Once per day, roll Godhead. Summon a number of Neurocytes equal to the successes. They will attack your enemies autonomously or otherwise raise havoc. Then, after 1 scene, they disperse into the sewers.	{"esoterica": {"points": 0, "skills": {"godhead": {"points": 3}}}}
52	Exorcism	You can use the Treat Wounds action, rolling Esoterica Mysticism instead, and targeting conditions and effects from the paranormal. You must still expend uses from a Medpack, modified for your esoteric purposes.	{"esoterica": {"points": 0, "skills": {"mysticism": {"points": 2}}}}
53	Palindromic Totems	You are able to work the runic structure of your Totems to “read” forward and backward. You may choose two effects to apply with your Rites.	{"esoterica": {"points": 0, "skills": {"mysticism": {"points": 4}}}}
54	Sanctified Munition	You know how to ward ammunition and projectiles. You may declare a number of magazines or projectiles equal to your Mysticism Rating each day. These magazines can damage creatures immune to traditional damage. You have +1 Ward while your weapon is loaded with Sanctified Munition.	{"esoterica": {"points": 0, "skills": {"mysticism": {"points": 2}}}}
55	Split Totemry	You can have more than one Totem active at a time.	{"esoterica": {"points": 0, "skills": {"mysticism": {"points": 2}}}}
56	Voidshadow	You are undetectable by Gestalt, Godhead, or Outerworld methods. If you act against a paranormal creature, or someone using those methods, they treat themselves as though they are blinded and deafened towards you.	{"esoterica": {"points": 0, "skills": {"mysticism": {"points": 4}}}}
57	Wyrding Ways	Your melee and throwing attacks can damage beings immune to traditional damage. They also deal +2 damage to paranormal creatures in general.	{"esoterica": {"points": 0, "skills": {"mysticism": {"points": 1}}}}
51	Anchoring	You can use Binding on ongoing paranormal effects or creatures. Roll Mysticism against an effects rating, sealing it on a success. Creatures contest Binding and, if they lose, they are slowed instead. You may upkeep this effect. If you do, and attempt to Bind them again, you stun them on success instead. If you continue to upkeep it, and succeed once more, they are Sealed.	{"esoterica": {"points": 0, "skills": {"mysticism": {"points": 3}}}}
58	Broken Mind, Broken Body	When either Wounded or Deranged, you can maintain two possessions simultaneously. When using Possession, you do so twice while in this condition, and must maintain both. (reroll doubles)	{"esoterica": {"points": 0, "skills": {"outerworld": {"points": 3}}}}
59	Enduring Possessions	You gain a number of extra rounds of possession equal to your Outerworld Rating before you must roll to maintain.	{"esoterica": {"points": 0, "skills": {"outerworld": {"points": 2}}}}
60	Ghost in the Machine	You can force a phantom into a digital device, causing it to malfunction. Analog devices are unaffected. The equipment’s rolls are Dooming. You must touch the machine.	{"esoterica": {"points": 0, "skills": {"outerworld": {"points": 2}}}}
61	Ghostmind	You can experience the last few moments of a ghost’s life. If those events are deemed traumatic enough, you may need to roll Outerworld to resist taking Sanity Damage (or even normal damage!).	{"esoterica": {"points": 0, "skills": {"outerworld": {"points": 2}}}}
62	Ouija Methodology	Using a simple method of communication (which could be digital if you also possess the Ghost in the Machine Perk), ghosts can speak through you. The method is of your choice and the GM’s approval.	{"esoterica": {"points": 0, "skills": {"outerworld": {"points": 1}}}}
63	Sallow Vessel	You can perform an additional possession every scene.	{"esoterica": {"points": 0, "skills": {"outerworld": {"points": 3}}}}
64	Shaped Possession	You mold phantoms as they possess your body. You roll twice on the possession table and choose one to apply. Reroll doubles.	{"esoterica": {"points": 0, "skills": {"outerworld": {"points": 2}}}}
65	Siccing Curse	Once per scene, cause a phantom to pursue a target you can see. While they are pursued, you can use your reaction to grant a roll they’re about to make Dooming. This lasts until the scene ends.	{"esoterica": {"points": 0, "skills": {"outerworld": {"points": 2}}}}
66	Contemporary Swordplay	When selling stolen goods to a fence, your barter checks are lucky.	{"peace": {"points": 0, "skills": {"barter": {"points": 2}}}}
67	Deal Theory	Once per scene, during the course of a Deal, negate the price effect of your opponent gaining the Upper Hand. You still choose whether or not to Double Down.	{"peace": {"points": 0, "skills": {"barter": {"points": 3}}}}
68	El Producto	When dealing with mercantile products in a situation that would call for Subterfuge rolls (such as concealing them), you may roll Barter instead.	{"peace": {"points": 0, "skills": {"barter": {"points": 2}}}}
69	Grand Economics	Whenever you earn profit margins (and repeating every 10 margins earned in one instance), you have a 1 in 3 chance of earning +3p. When converting to Spending Power, for each Spending Power, you have a 1 in 3 chance of earning +9p.	{"peace": {"points": 0, "skills": {"barter": {"points": 4}}}}
70	Market Data	You always know the market value of goods and products, and can correctly estimate hauls at a glance. You receive +2 Dice when estimating, and do so without spending an action.	{"peace": {"points": 0, "skills": {"barter": {"points": 1}}}}
71	Palm Greaser	Due to the frequency with which you “grease palms”, characters are satisfied with half the amount they’d normally expect when taking a bribe.	{"peace": {"points": 0, "skills": {"barter": {"points": 2}}}}
72	Scams and Ploys	You are always aware if a character is attempting to scam, mislead, or short you on some sort of business deal. This does not tell you how, only that something is off.	{"peace": {"points": 0, "skills": {"barter": {"points": 2}}}}
73	The Ringer	When selling product directly to an individual for profit margins, you earn +1d6p.	{"peace": {"points": 0, "skills": {"barter": {"points": 1}}}}
74	Tasks Thee	You’ve become an expert provocateur. Once per scene, when making a Deal, you may force your rival to Double Down.	{"peace": {"points": 0, "skills": {"barter": {"points": 2}}}}
75	Bilateral Study	When you study you may choose two topics. After rolling, you can distribute your questions between the two, and can do each question one at a time this way.	{"peace": {"points": 0, "skills": {"erudition": {"points": 3}}}}
76	Font of Knowledge	Whenever you succeed on an Erudition check, and your result allows you to ask a question, you may ask 2 instead.	{"peace": {"points": 0, "skills": {"erudition": {"points": 2}}}}
77	Lightning Round	When Pushing an Erudition roll in combat, it doesn’t use an action. This effect can only occur once per turn.	{"peace": {"points": 0, "skills": {"erudition": {"points": 2}}}}
78	Orchestrated Study	When you study, every non-goon character that helps you (see collective action) can choose to grant +2 dice to the roll, regardless of their Erudition.	{"peace": {"points": 0, "skills": {"erudition": {"points": 2}}}}
79	Sequenced Computations	In combat, after succeeding on an Erudition check to identify or recall information, you may make another such check without expending an action.	{"peace": {"points": 0, "skills": {"erudition": {"points": 3}}}}
80	Tactical Superiority	When you succeed on a roll to identify a foe, you grant that foe -1 armor until your next turn.	{"peace": {"points": 0, "skills": {"erudition": {"points": 3}}}}
81	Gnostic Dialogue	During the course of dialogue, if a skill check is called for to recall information, you may roll Peace Rhetoric instead, convincing the other person to share their information instead. This does not work if the other person is similarly ignorant on the subject.	{"peace": {"points": 0, "skills": {"rhetoric": {"points": 2}}}}
82	Mob Mentality	When performing Crowdwork, your Rhetoric rolls gain Booming.	{"peace": {"points": 0, "skills": {"rhetoric": {"points": 2}}}}
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
109	Bullet Time	You can use pistols to Parry projectiles. Spray and Blast Weapons cannot be parried.	{"violence": {"points": 0, "skills": {"shooting": {"points": 3}}}}
110	Breach and Clear	You can use Submachine Guns in melee without penalty. You can salvo fire a submachine gun after a charge.	{"violence": {"points": 0, "skills": {"shooting": {"points": 1}}}}
111	Controlled Burst	If your weapon has a salvo rating larger than 2, you can instead treat it as 2. When you do, you may temporarily clear one condition of your choice affecting that roll.	{"violence": {"points": 0, "skills": {"shooting": {"points": 1}}}}
112	Contained Impact	When declaring an AoE shooting attack (Blast or Spray), you may declare up to two contiguous tiles to be exempt from the attack.	{"violence": {"points": 0, "skills": {"shooting": {"points": 1}}}}
113	Maximal Firepower	Increase Spray weapons range by 10 feet. Increase Blast radius by 5 feet.	{"violence": {"points": 0, "skills": {"shooting": {"points": 3}}}}
114	Pistolero	You can distribute your mixed salvo attacks to different targets when “dual” wielding pistols.	{"violence": {"points": 0, "skills": {"shooting": {"points": 2}}}}
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
128	Snatching Dog	When failing a roll to pickpocket or performing similar activities, you can still take the targeted object, but the target is aware and may react.	{"violence": {"points": 0, "skills": {"subterfuge": {"points": 1}}}}
129	Beast Mode	When you become Wounded, you gain +2 speed and shed all your negative conditions (including persistent damage).	{"violence": {"points": 0, "skills": {"threshold": {"points": 2}}}}
130	Cyber Barbarian	You may roll Threshold instead of Assault for Improvised Weapons and unarmed attacks. Increase the damage of an improvised weapon by +1 per hand it requires.	{"violence": {"points": 0, "skills": {"threshold": {"points": 2}}}}
131	Full Metal Tank	Persistent Damage effects (Bleed, Burning, Damaging Poison, etc.) end after 1 round for you.	{"violence": {"points": 0, "skills": {"threshold": {"points": 2}}}}
132	Maximum Effort	You add an additional +1 dice when you Push It.	{"violence": {"points": 0, "skills": {"threshold": {"points": 2}}}}
133	Neo Angel	You can use your reaction to intercept an attack targeting an adjacent character. The attack resolves with you as its target. You can make a parry as a part of this reaction.	{"violence": {"points": 0, "skills": {"threshold": {"points": 2}}}}
134	The Makings Of	You receive +2 HP, +1 Permanent Injury (before going AWOL), and +2 Cyber.	{"violence": {"points": 0, "skills": {"threshold": {"points": 4}}}}
135	Werewolf	After completing a scene, you regenerate 1d6 Health or remove a condition applied by a wound.	{"violence": {"points": 0, "skills": {"threshold": {"points": 4}}}}
136	Ambidextrous	Whenever you take any action that only requires one hand, your other hand, if empty, can be used to perform a separate Item or Interact action. (Once per turn)	{}
137	Born and Raised	You choose 1 District. You know this ground perfectly. All attempts to navigate, track, or otherwise traverse the space within this area receive Booming and +1 Dice. The adjacent areas to the chosen district receive +1 Dice.	{}
138	Bottled Lightning	You receive +2 dice when rolling for initiative.	{}
139	Chain Shocking	Whenever a target suffers damage from a Shocking condition you applied, it jumps to an additional enemy. It cannot jump to the same enemy twice in one jump, but subsequent shocks can.	{}
140	Flame Jester	Whenever a character takes Sanity damage from the Burning Condition, you may use your reaction to psychotically laugh. If you do, the target’s allies within line of sight take 1 Sanity damage. (may affect third parties)	{}
141	Hobbyist	Put 1 skill point in each of three separate skills that currently have 0 points in them.	{}
142	Lucky Break	Whenever you succeed at a roll that can critically fail, you gain Xd6 profit margins, where X is the number of times you’ve succeeded this session.	{}
143	Mamba	Whenever a target you poisoned ends their turn (while poisoned), they lose 2 Health.	{}
144	Ordered Solution	Declare one item (such as smoke grenades or power cells) or weapon. The chosen item is always considered to be sourced.	{}
145	Sanguinity	Whenever a character loses health due to a Bleed you inflicted on them, you can remove 1 condition currently affecting you, unless it is  the result of a permanent injury or insanity.	{}
146	Stunning Demolition	Whenever you damage a target using the Detonate keyword, you cause 1 adjacent enemy to receive the Rattled condition.	{}
147	Subtle Modification	Add +2 to one or +1 to two of the stats listed on the character sheet (health, speed, etc.). Cannot be Armor, Ward, or Evasion.	{}
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: ben_long
--

COPY public."User" (id, "firstName", "lastName", "profilePicture", "googleId", "facebookId", email, password, role, "createdAt") FROM stdin;
2	Ben	Long	https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=8764376486948679&height=50&width=50&ext=1738457442&hash=AbbeDijDnGgLPwyavKw387tc	\N	8764376486948679	benjlong50@gmail.com	\N	ADMIN	2025-01-03 00:50:42.71
3	Ben	Long	\N	\N	\N	benjlong@gmail.com	$2a$10$JOizQ/JAQpX7W4LVDeSDXOnxrurm7HCmfOQLi6xFWLpDJSYfSyLWe	ADMIN	2025-01-03 20:12:17.647
\.


--
-- Data for Name: Weapon; Type: TABLE DATA; Schema: public; Owner: ben_long
--

COPY public."Weapon" (id, name, picture, description, stats, price, keywords) FROM stdin;
22	Unarmed	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735941454/gated/neaqjp1z31ji8qsasi4j.jpg", "publicId": "gated/neaqjp1z31ji8qsasi4j"}	God’s greatest gift to mankind.	{"damage": 1}	\N	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 5}","{\\"keywordId\\": 6}","{\\"keywordId\\": 2}"}
23	Breacher	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1736057704/gated/dm5afmycafovkiqgwwdj.jpg", "publicId": "gated/dm5afmycafovkiqgwwdj"}	A police shotgun designed to enter enclosed areas while swiftly delivering zones of lethality.	{"range": 20, "salvo": 3, "damage": 5, "weight": 3, "magCount": 3, "magCapacity": 8}	7	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 7}"}
46	Mazer Beam Cannon - Level 1	""	The single charge weapon profile for the Mazer Bean Cannon cyber weapon. It still packs a punch.	{"range": 15, "salvo": 2, "damage": 6}	\N	{"{\\"keywordId\\": 9}","{\\"keywordId\\": 2}","{\\"keywordId\\": 20}"}
47	Mazer Beam Cannon - Level 3	""	The triple charge weapon profile for the Mazer Bean Cannon cyber weapon. None will be left alive.	{"range": 15, "salvo": 1, "damage": 8}	\N	{"{\\"keywordId\\": 9}","{\\"keywordId\\": 10}","{\\"keywordId\\": 2}","{\\"keywordId\\": 26}","{\\"keywordId\\": 20}"}
51	Ignition Greatsword	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735975849/gated/n6letag5xgqvlytta5kd.jpg", "publicId": "gated/n6letag5xgqvlytta5kd"}	An electrochemical weapon that creates a cloud of bound incendiary particles following the blade.	{"damage": 6, "flurry": 3, "weight": 5, "magCount": 3, "magCapacity": 4}	14	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 8}","{\\"value\\": 2, \\"keywordId\\": 32}"}
53	Electo-Fists	""	Enhanced "unarmed" attacks only achievable with the T-90 Electro-Knuckle augment. The punches delivered with these bad boys can be quite shocking.	{"damage": 2}	\N	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 5}","{\\"keywordId\\": 2}","{\\"keywordId\\": 20}"}
50	Needle Gun	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735973707/gated/ccbvkz9ds29l9326pa8m.jpg", "publicId": "gated/ccbvkz9ds29l9326pa8m"}	A weapon commonly used by Royals agents. Magnets silently accelerate fragile needles for quiet operations.	{"range": 15, "salvo": 6, "damage": 2, "weight": 2, "magCount": 3, "magCapacity": 25}	10	{"{\\"keywordId\\": 21}","{\\"keywordId\\": 44}","{\\"keywordId\\": 8}","{\\"keywordId\\": 22}","{\\"keywordId\\": 40}"}
49	PDW	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735973658/gated/naz1hzdt5e5ggpi8t1qx.jpg", "publicId": "gated/naz1hzdt5e5ggpi8t1qx"}	The mainstay of any Anti-Gang Unit worth its salt. Most are ID locked to their user with their vitals linked to the station.	{"range": 20, "salvo": 5, "damage": 2, "weight": 2, "magCount": 3, "magCapacity": 16}	7	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 22}","{\\"keywordId\\": 21}"}
48	Mazer Beam Cannon - Level 2	""	The double charge weapon profile for the Mazer Bean Cannon cyber weapon. Fun for you and your friend over there.	{"range": 15, "salvo": 2, "damage": 8}	\N	{"{\\"keywordId\\": 9}","{\\"keywordId\\": 2}","{\\"keywordId\\": 27}","{\\"keywordId\\": 20}"}
52	Cyber Blade	""	The blade hidden within the Kenjiko Mk. 1 augment. No one will know it's there, until it's too late.	{"damage": 5, "flurry": 2}	\N	{"{\\"keywordId\\": 1}","{\\"keywordId\\": 3}","{\\"keywordId\\": 4}","{\\"keywordId\\": 2}","{\\"keywordId\\": 20}"}
36	Kairos LMG	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735961732/gated/yks1rmt4cojymbava0sc.jpg", "publicId": "gated/yks1rmt4cojymbava0sc"}	A Noble commissioned weapon to be elegantly fearsome. Many streetgangs deliberately deface theirs.	{"range": 50, "salvo": 6, "damage": 4, "weight": 5, "magCount": 3, "magCapacity": 20}	18	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 24}","{\\"keywordId\\": 22}"}
24	Pioneer	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735941974/gated/fpntbwmc4ywekyg5vja9.jpg", "publicId": "gated/fpntbwmc4ywekyg5vja9"}	The old fashioned revolver, still popular amongst outriders, nomads, smugglers, and desert dwellers alike.	{"range": 30, "salvo": 2, "damage": 2, "weight": 1, "magCount": 3, "magCapacity": 4}	2	{"{\\"keywordId\\": 10}","{\\"keywordId\\": 2}","{\\"keywordId\\": 9}","{\\"keywordId\\": 11}"}
25	Ranger Smoothbore	{"imageUrl": "https://res.cloudinary.com/dm4tmla72/image/upload/v1735942038/gated/djkendpcalua4g997zyg.jpg", "publicId": "gated/djkendpcalua4g997zyg"}	The weapon of choice for hired outriders, those lonesome souls that patrol the Wastes Between.	{"range": 20, "salvo": 2, "damage": 5, "weight": 3, "magCount": 3, "magCapacity": 8}	4	{"{\\"keywordId\\": 8}","{\\"keywordId\\": 7}"}
\.


--
-- Data for Name: _ArmorToCharacter; Type: TABLE DATA; Schema: public; Owner: ben_long
--

COPY public."_ArmorToCharacter" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _CharacterToCybernetic; Type: TABLE DATA; Schema: public; Owner: ben_long
--

COPY public."_CharacterToCybernetic" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _CharacterToPerk; Type: TABLE DATA; Schema: public; Owner: ben_long
--

COPY public."_CharacterToPerk" ("A", "B") FROM stdin;
1	2
1	9
1	114
\.


--
-- Data for Name: _CharacterToWeapon; Type: TABLE DATA; Schema: public; Owner: ben_long
--

COPY public."_CharacterToWeapon" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _CyberneticActions; Type: TABLE DATA; Schema: public; Owner: ben_long
--

COPY public."_CyberneticActions" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _CyberneticArmor; Type: TABLE DATA; Schema: public; Owner: ben_long
--

COPY public."_CyberneticArmor" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _CyberneticWeapons; Type: TABLE DATA; Schema: public; Owner: ben_long
--

COPY public."_CyberneticWeapons" ("A", "B") FROM stdin;
\.


--
-- Name: Action_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ben_long
--

SELECT pg_catalog.setval('public."Action_id_seq"', 24, true);


--
-- Name: Armor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ben_long
--

SELECT pg_catalog.setval('public."Armor_id_seq"', 10, true);


--
-- Name: BookEntry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ben_long
--

SELECT pg_catalog.setval('public."BookEntry_id_seq"', 24, true);


--
-- Name: Character_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ben_long
--

SELECT pg_catalog.setval('public."Character_id_seq"', 3, true);


--
-- Name: Cybernetic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ben_long
--

SELECT pg_catalog.setval('public."Cybernetic_id_seq"', 14, true);


--
-- Name: Keyword_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ben_long
--

SELECT pg_catalog.setval('public."Keyword_id_seq"', 48, true);


--
-- Name: Perk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ben_long
--

SELECT pg_catalog.setval('public."Perk_id_seq"', 147, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ben_long
--

SELECT pg_catalog.setval('public."User_id_seq"', 3, true);


--
-- Name: Weapon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ben_long
--

SELECT pg_catalog.setval('public."Weapon_id_seq"', 53, true);


--
-- Name: Action Action_pkey; Type: CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."Action"
    ADD CONSTRAINT "Action_pkey" PRIMARY KEY (id);


--
-- Name: Armor Armor_pkey; Type: CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."Armor"
    ADD CONSTRAINT "Armor_pkey" PRIMARY KEY (id);


--
-- Name: BookEntry BookEntry_pkey; Type: CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."BookEntry"
    ADD CONSTRAINT "BookEntry_pkey" PRIMARY KEY (id);


--
-- Name: Character Character_pkey; Type: CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."Character"
    ADD CONSTRAINT "Character_pkey" PRIMARY KEY (id);


--
-- Name: Cybernetic Cybernetic_pkey; Type: CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."Cybernetic"
    ADD CONSTRAINT "Cybernetic_pkey" PRIMARY KEY (id);


--
-- Name: Keyword Keyword_pkey; Type: CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."Keyword"
    ADD CONSTRAINT "Keyword_pkey" PRIMARY KEY (id);


--
-- Name: Perk Perk_pkey; Type: CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."Perk"
    ADD CONSTRAINT "Perk_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Weapon Weapon_pkey; Type: CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."Weapon"
    ADD CONSTRAINT "Weapon_pkey" PRIMARY KEY (id);


--
-- Name: Action_name_key; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE UNIQUE INDEX "Action_name_key" ON public."Action" USING btree (name);


--
-- Name: Armor_name_key; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE UNIQUE INDEX "Armor_name_key" ON public."Armor" USING btree (name);


--
-- Name: BookEntry_title_key; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE UNIQUE INDEX "BookEntry_title_key" ON public."BookEntry" USING btree (title);


--
-- Name: Cybernetic_name_key; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE UNIQUE INDEX "Cybernetic_name_key" ON public."Cybernetic" USING btree (name);


--
-- Name: Keyword_name_keywordType_key; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE UNIQUE INDEX "Keyword_name_keywordType_key" ON public."Keyword" USING btree (name, "keywordType");


--
-- Name: Perk_name_key; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE UNIQUE INDEX "Perk_name_key" ON public."Perk" USING btree (name);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_facebookId_key; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE UNIQUE INDEX "User_facebookId_key" ON public."User" USING btree ("facebookId");


--
-- Name: User_googleId_key; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE UNIQUE INDEX "User_googleId_key" ON public."User" USING btree ("googleId");


--
-- Name: Weapon_name_key; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE UNIQUE INDEX "Weapon_name_key" ON public."Weapon" USING btree (name);


--
-- Name: _ArmorToCharacter_AB_unique; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE UNIQUE INDEX "_ArmorToCharacter_AB_unique" ON public."_ArmorToCharacter" USING btree ("A", "B");


--
-- Name: _ArmorToCharacter_B_index; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE INDEX "_ArmorToCharacter_B_index" ON public."_ArmorToCharacter" USING btree ("B");


--
-- Name: _CharacterToCybernetic_AB_unique; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE UNIQUE INDEX "_CharacterToCybernetic_AB_unique" ON public."_CharacterToCybernetic" USING btree ("A", "B");


--
-- Name: _CharacterToCybernetic_B_index; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE INDEX "_CharacterToCybernetic_B_index" ON public."_CharacterToCybernetic" USING btree ("B");


--
-- Name: _CharacterToPerk_AB_unique; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE UNIQUE INDEX "_CharacterToPerk_AB_unique" ON public."_CharacterToPerk" USING btree ("A", "B");


--
-- Name: _CharacterToPerk_B_index; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE INDEX "_CharacterToPerk_B_index" ON public."_CharacterToPerk" USING btree ("B");


--
-- Name: _CharacterToWeapon_AB_unique; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE UNIQUE INDEX "_CharacterToWeapon_AB_unique" ON public."_CharacterToWeapon" USING btree ("A", "B");


--
-- Name: _CharacterToWeapon_B_index; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE INDEX "_CharacterToWeapon_B_index" ON public."_CharacterToWeapon" USING btree ("B");


--
-- Name: _CyberneticActions_AB_unique; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE UNIQUE INDEX "_CyberneticActions_AB_unique" ON public."_CyberneticActions" USING btree ("A", "B");


--
-- Name: _CyberneticActions_B_index; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE INDEX "_CyberneticActions_B_index" ON public."_CyberneticActions" USING btree ("B");


--
-- Name: _CyberneticArmor_AB_unique; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE UNIQUE INDEX "_CyberneticArmor_AB_unique" ON public."_CyberneticArmor" USING btree ("A", "B");


--
-- Name: _CyberneticArmor_B_index; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE INDEX "_CyberneticArmor_B_index" ON public."_CyberneticArmor" USING btree ("B");


--
-- Name: _CyberneticWeapons_AB_unique; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE UNIQUE INDEX "_CyberneticWeapons_AB_unique" ON public."_CyberneticWeapons" USING btree ("A", "B");


--
-- Name: _CyberneticWeapons_B_index; Type: INDEX; Schema: public; Owner: ben_long
--

CREATE INDEX "_CyberneticWeapons_B_index" ON public."_CyberneticWeapons" USING btree ("B");


--
-- Name: Character Character_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."Character"
    ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _ArmorToCharacter _ArmorToCharacter_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."_ArmorToCharacter"
    ADD CONSTRAINT "_ArmorToCharacter_A_fkey" FOREIGN KEY ("A") REFERENCES public."Armor"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ArmorToCharacter _ArmorToCharacter_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."_ArmorToCharacter"
    ADD CONSTRAINT "_ArmorToCharacter_B_fkey" FOREIGN KEY ("B") REFERENCES public."Character"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CharacterToCybernetic _CharacterToCybernetic_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."_CharacterToCybernetic"
    ADD CONSTRAINT "_CharacterToCybernetic_A_fkey" FOREIGN KEY ("A") REFERENCES public."Character"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CharacterToCybernetic _CharacterToCybernetic_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."_CharacterToCybernetic"
    ADD CONSTRAINT "_CharacterToCybernetic_B_fkey" FOREIGN KEY ("B") REFERENCES public."Cybernetic"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CharacterToPerk _CharacterToPerk_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."_CharacterToPerk"
    ADD CONSTRAINT "_CharacterToPerk_A_fkey" FOREIGN KEY ("A") REFERENCES public."Character"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CharacterToPerk _CharacterToPerk_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."_CharacterToPerk"
    ADD CONSTRAINT "_CharacterToPerk_B_fkey" FOREIGN KEY ("B") REFERENCES public."Perk"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CharacterToWeapon _CharacterToWeapon_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."_CharacterToWeapon"
    ADD CONSTRAINT "_CharacterToWeapon_A_fkey" FOREIGN KEY ("A") REFERENCES public."Character"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CharacterToWeapon _CharacterToWeapon_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."_CharacterToWeapon"
    ADD CONSTRAINT "_CharacterToWeapon_B_fkey" FOREIGN KEY ("B") REFERENCES public."Weapon"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CyberneticActions _CyberneticActions_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."_CyberneticActions"
    ADD CONSTRAINT "_CyberneticActions_A_fkey" FOREIGN KEY ("A") REFERENCES public."Action"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CyberneticActions _CyberneticActions_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."_CyberneticActions"
    ADD CONSTRAINT "_CyberneticActions_B_fkey" FOREIGN KEY ("B") REFERENCES public."Cybernetic"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CyberneticArmor _CyberneticArmor_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."_CyberneticArmor"
    ADD CONSTRAINT "_CyberneticArmor_A_fkey" FOREIGN KEY ("A") REFERENCES public."Armor"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CyberneticArmor _CyberneticArmor_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."_CyberneticArmor"
    ADD CONSTRAINT "_CyberneticArmor_B_fkey" FOREIGN KEY ("B") REFERENCES public."Cybernetic"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CyberneticWeapons _CyberneticWeapons_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."_CyberneticWeapons"
    ADD CONSTRAINT "_CyberneticWeapons_A_fkey" FOREIGN KEY ("A") REFERENCES public."Cybernetic"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CyberneticWeapons _CyberneticWeapons_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ben_long
--

ALTER TABLE ONLY public."_CyberneticWeapons"
    ADD CONSTRAINT "_CyberneticWeapons_B_fkey" FOREIGN KEY ("B") REFERENCES public."Weapon"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: ben_long
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--


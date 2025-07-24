import { InitiateApplication } from "./DOMContent/DOMContent";
import { ShuffleCardsContent } from "./GameContent/ShuffleCardsContent";
import { HomeSectorContent } from "./GameContent/HomeSectorContent";

import './styles/styles.css';

InitiateApplication(); 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Review Center:
// This section will used as a review for HTML, CSS, and JavaScript properties and functions. 

/** |FSM (Finite State Machines)|
 * A finite state machine (FSM) is a mathemtical model of computation that represents a system with a finite number
 * of states. It can be exactly one state at any given time and transitions between states based on inputs. FSMs
 * are used in various applications, including modeling system behavior, designing circuits, and in computer science
 * for compilers and network protocols.
 * 
 * -> Game Development: FSMs are used to define the behavior of game characters, AI agents, and other interactive elements. 
 * 
 * FSM Development: 
 * Can be used for: Structured behavior trees (phases, roles)
 * States: Defend, Attack, Heal, Draw, Buff
 * Transitions/Inputs: Based on game state (e.g., low health -> Heal)
 * Add Depth: Combine with weighted evaluation.
 * 
 * Scoring Heuristics + Weighted Evaluation Development:
 * Use for: Prioritizing cards or moves based on context.
 * Assign scores to each move: Mainly the attack moves for now.
 * Evaluate all legal moves and pick the highest score.
 * Can adapt weights based on the player's strategy. 
 */



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Testing Center: 
// All of these functions are in this file for testing purposes and will be removed once testing is over. 
// HomeSectorContent(); // Testing and editing the home sector content. (This is the homepage for the application)
ShuffleCardsContent(0); // Testing the shuffle Cards Content 


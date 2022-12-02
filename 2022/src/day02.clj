(ns day02
  (:require [clojure.string :as str]))

(def data (slurp "./input/day02.input"))

(println "Part 1:")

(defn map-play [play]
  (cond
    (= play "X") :rock
    (= play "A") :rock
    (= play "Y") :paper
    (= play "B") :paper
    (= play "Z") :scissors
    (= play "C") :scissors
    :else nil))

(defn wins? [opponent self]
  (cond
    (and (= self :rock) (= opponent :scissors)) true
    (and (= self :paper) (= opponent :rock)) true
    (and (= self :scissors) (= opponent :paper)) true
    :else false))

(defn choice-amount [choice]
  (cond
    (= choice :rock) 1
    (= choice :paper) 2
    (= choice :scissors) 3
    :else 0))

(defn score [opponent self]
  (cond
    (= (map-play opponent) (map-play self)) (+ 3 (choice-amount (map-play self))) ; a draw gets 3 + choice-amount
    (wins? (map-play opponent) (map-play self)) (+ 6 (choice-amount (map-play self))) ; a win gets 6 + choice-amount
    :else (+ 0 (choice-amount (map-play self))))) ; a loss gets 0 + choice-amount

(def plays
  (vec (map #(str/split %1 #" ") (str/split data #"\n"))))

(def scores
  (map (fn [play] (apply score play)) plays))

(println (reduce + scores))

(println "Part 2:")

(defn shape? [opponent code]
  (cond
    (= code "X") (cond ; need to lose
                   (= opponent "A") "C"
                   (= opponent "B") "A"
                   (= opponent "C") "B"
                   :else nil)
    (= code "Y") opponent ; need to draw
    (= code "Z") (cond ; need to win
                   (= opponent "A") "B"
                   (= opponent "B") "C"
                   (= opponent "C") "A"
                   :else nil)
    :else nil))

(def correct-plays
  (map (fn [play] [(get play 0) (apply shape? play)]) plays))

(def correct-scores
  (map (fn [play] (apply score play)) correct-plays))

(println (reduce + correct-scores))

(ns day05
  (:require [clojure.string :as str]))

(def data (slurp "./input/day05.input"))

(defn transpose [m]
  (apply mapv vector m))

(def starting-state-drawing ; the "raw drawing"
  (-> data
       (str/split #"\n\n")
       (get 0)))

(def starting-state ; a 'somewhat useful' data structure
  (->> #"\n"
       (str/split starting-state-drawing)
       (map (fn [line] (-> line
                           (str (str/join "" (repeat(- 36 (count line)) " ")))
                           (str/replace #"    " " [x]")
                           (str/replace #"\[" "")
                           (str/replace #"]" "")
                           (str/split #" "))))
       (drop-last)
       (transpose)
       (map #(filter (fn [c] (not= c "x")) %1))
       (vec)))

; the list of operations as a sequence of [num-crates from-col to-col]
(def operations
  (let [raw-operations (str/split (get (str/split data #"\n\n") 1) #"\n")]
    (->> raw-operations
         (map (fn [op]
                (let [op-matcher (re-matcher #"move (\d+) from (\d) to (\d)" op)]
                  (map
                    #(Integer/parseInt %1)
                    (take-last 3 (re-find op-matcher))
                    ))))
         (vec))))

; give a state of crates, return a new state with the given operation performed
(defn process-operation [start-state model num from to]
  (let [stacking-order-fn (if (= model "9000") reverse identity)
        to-move (stacking-order-fn (take num (get start-state (- from 1))))
        new-from (drop num (get start-state (- from 1)))
        new-to (concat to-move (get start-state (- to 1)))
        replaced-from (assoc start-state (- from 1) new-from)]
      (assoc replaced-from (- to 1) new-to)))

(defn process-all-operations [model]
  (loop [state starting-state
         i 0]
    (if (< i (count operations))
      (let [args (vec (concat [state model] (get operations i)))]
        (recur (apply process-operation args) (inc i)))
      state)))

(defn get-top-row [crates]
  (->> crates
       (map #(first (take 1 %1)))
       (str/join)))

(println "Part 1:")
(println (get-top-row (process-all-operations "9000")))

(println "Part 2:")
(println (get-top-row (process-all-operations "9001")))

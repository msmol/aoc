(ns day03
  (:require [clojure.string :as str])
  (:require [clojure.set :as set]))

(def data (slurp "./input/day03.input"))

(def alphabet (concat ["#"] (map char (range 97 123)) (map char (range 65 91))))

(println "Part 1:")

(def rucksacks
  (map #(split-at (/ (count %1) 2) %1) (str/split data #"\n")))

(def common-per-rucksack
  (map (fn [compartment]
         (get (vec (set/intersection
                     (set (get compartment 0))
                     (set (get compartment 1))))
              0)) rucksacks))

(def priority-of-commons
  (map (fn [common] (.indexOf alphabet common)) common-per-rucksack))

(println (reduce + priority-of-commons))

(println "Part 2:")

(def trio-rucksacks
  (partition 3 (str/split data #"\n")))

(def common-letter-per-trio
  (map (fn [trio]
         (let [elfs-unique-letters (map (fn [rucksack]
                                (set rucksack)) trio)]
           (get (vec (apply set/intersection elfs-unique-letters)) 0))) trio-rucksacks))

(def priority-of-trio-commons
  (map (fn [common] (.indexOf alphabet common)) common-letter-per-trio))

(println (reduce + priority-of-trio-commons))

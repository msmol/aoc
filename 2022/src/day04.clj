(ns day04
  (:require [clojure.string :as str])
  (:require [clojure.set :as set]))

(def data (slurp "./input/day04.input"))

(defn inclusive-range
  ([] (range))
  ([end] (range (inc end)))
  ([start end] (range start (inc end)))
  ([start end step] (range start (+ end step) step)))

(def elf-pair-assignment-ranges
  (->> #"\n"
       (str/split data)
       (map (fn [pair]
              (->> #","
                   (str/split pair)
                   (map (fn [elf-range]
                          (set (apply inclusive-range (map #(Integer/parseInt %1) (str/split elf-range #"-")))))))))))

(def pairs-full-overlap
  (filter (fn [elf-pair]
            (let [elf1 (get (vec elf-pair) 0)
                  elf2 (get (vec elf-pair) 1)]
              (or (set/subset? elf1 elf2) (set/subset? elf2 elf1)))
            ) elf-pair-assignment-ranges))

(println "Part 1:")
(println (count pairs-full-overlap))

(println "Part 2:")

(def pairs-partial-overlap
  (filter (fn [elf-pair]
            (let [elf1 (get (vec elf-pair) 0)
                  elf2 (get (vec elf-pair) 1)]
              (let [intersection (set/intersection elf1 elf2)]
                (> (count intersection) 0)))
            ) elf-pair-assignment-ranges))

(println (count pairs-partial-overlap))

(ns day01
  (:require [clojure.string :as str]))

(def data (slurp "./input/day01.input"))

(def items-per-elf (map (fn [per-elf]
                          (map #(Integer/parseInt %1) (str/split per-elf #"\n"))
                          ) (str/split data #"\n\n")))

(def calories-per-elf (map #(reduce + %1) items-per-elf))

(println "Part 1:")
(println (apply max calories-per-elf))

(println "Part 2:")
(println (apply + (take-last 3 (sort calories-per-elf))))

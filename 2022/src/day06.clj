(ns day06
  (:require [clojure.string :as str]))

(def data (->> "./2022/input/day06.input"
               (slurp)
               (#(str/split %1 #""))))

(defn find-marker [marker-length]
  (->> data
       (partition marker-length 1)
       (map #(count (set %1)))
       (#(.indexOf %1 marker-length))
       (+ marker-length)))

(println "Part 1")
(println (find-marker 4))

(println "Part 2")
(println (find-marker 14))

(ns day06
  (:require [clojure.string :as str]))

(def data (->> "./2022/input/day06.input"
               (slurp)
               (#(str/split %1 #""))))

(defn find-marker [marker-length]
  (->> data
       (map-indexed (fn [i _]
                      (let [end-index (+ i marker-length)]
                        (if (< end-index (count data))
                          (subvec data i end-index)
                          nil)
                        )))
       (filter not-empty)
       (map #(count (set %1)))
       (#(.indexOf %1 marker-length))
       (+ marker-length)))

(println "Part 1")
(println (find-marker 4))

(println "Part 2")
(println (find-marker 14))

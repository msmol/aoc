(ns day08
  (:require [clojure.string :as str]))

(defn transpose [m]
  (apply mapv vector m))

(def trees (->> "./2022/input/day08.input"
                (slurp)
                (#(str/split %1 #"\n"))
                (map #(str/split %1 #""))
                (map (fn [row] (map #(Integer/parseInt %1) row)))
                (transpose)))

(defn is-visible?
  "Determines whether a tree at a given location is visible"
  [all-trees x y]
  (let [transposed (transpose trees)
        left (subvec (get transposed y) 0 x)
        right (subvec (get transposed y) (+ x 1) (count (get all-trees y)))
        above (subvec (get all-trees x) 0 y)
        below (subvec (get all-trees x) (+ y 1) (count (get all-trees x)))
        tree (get-in trees [x y])]
    (some (fn [direction]
            (every? #(> tree %1) direction)) [left right above below])))

(println "Part 1:" (->> trees
                        (map-indexed (fn [y column] (map-indexed (fn [x _] (is-visible? trees x y)) column)))
                        flatten
                        (filter #(true? %1))
                        count))

(defn find-first
  "Find the first item in a list that satisfies f"
  [f coll]
  (first (filter f coll)))

(defn get-view
  "Gets how far past it's neighbours a tree can 'see'"
  [height neighbours]
  (let [first-blocker (find-first #(>= %1 height) neighbours)]
    (cond
      (nil? first-blocker) (count neighbours)
      :else (inc (.indexOf neighbours first-blocker)))
    ))

(defn scenic-score
  "Gets the scenic score of a tree"
  [all-trees x y]
  (let [transposed (transpose trees)
        tree (get-in trees [x y])
        left-view (get-view tree (reverse (subvec (get transposed y) 0 x)))
        right-view (get-view tree (subvec (get transposed y) (+ x 1) (count (get all-trees y))))
        above-view (get-view tree (reverse (subvec (get all-trees x) 0 y)))
        below-view (get-view tree (subvec (get all-trees x) (+ y 1) (count (get all-trees x))))]
    (* left-view right-view above-view below-view)))

(println "Part 2:" (->> trees
                        (map-indexed (fn [y column] (map-indexed (fn [x _] (scenic-score trees x y)) column)))
                        flatten
                        (apply max)))

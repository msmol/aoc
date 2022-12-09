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

(def transposed-trees (transpose trees))

(defn is-visible?
  "Determines whether a tree at a given location is visible"
  [x y]
  (let [left (take x (get transposed-trees y))
        right (drop (inc x) (get transposed-trees y))
        above (take y (get trees x))
        below (drop (inc y) (get trees x))
        tree (get-in trees [x y])]
    (some (fn [direction]
            (every? #(> tree %1) direction)) [left right above below])))

(println "Part 1:" (->> trees
                        (map-indexed (fn [y column] (map-indexed (fn [x _] (is-visible? x y)) column)))
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
  [x y]
  (let [tree (get-in trees [x y])
        left-view (get-view tree (reverse (take x (get transposed-trees y))))
        right-view (get-view tree (drop (inc x) (get transposed-trees y)))
        above-view (get-view tree (reverse (take y (get trees x))))
        below-view (get-view tree (drop (inc y) (get trees x)))]
    (* left-view right-view above-view below-view)))

(println "Part 2:" (->> trees
                        (map-indexed (fn [y column] (map-indexed (fn [x _] (scenic-score x y)) column)))
                        flatten
                        (apply max)))

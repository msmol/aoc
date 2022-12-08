(ns day07
  (:require [clojure.string :as str]))

(def data (str/split (slurp "./2022/input/day07.input") #"\n"))

(defn get-parent-dirs [dir]
  (let [dir-arr (str/split dir #"/")]
    (->> dir-arr
         (map-indexed (fn [i _]
                        (subvec dir-arr 0 i)))
         (map #(str/join "/" %1))
         (drop 2)
         (concat ["/"])
         )))

(defn update-filesize-at-path [col path filesize]
  (let [current-dir-size (or (get col path) 0)]
    (merge col {path (+ filesize current-dir-size)})))


(def filesystem (loop [i 0
                       stack []
                       sizes {}]
                  (if (< i (count data))
                    (let [line (get data i)
                          is-cd (str/starts-with? line "$ cd")
                          new-dir (if is-cd (subs line 5) nil)
                          go-up? (if (= new-dir "..") true false)
                          new-stack (if is-cd (if go-up? (pop stack) (conj stack new-dir)) stack)
                          is-command-result (not (str/starts-with? line "$"))
                          is-dir (str/starts-with? line "dir")
                          is-file (and is-command-result (not is-dir))
                          filesize (if is-file (Integer/parseInt (get (str/split line #" ") 0)) 0)
                          filename (if is-file (get (str/split line #" ") 1) nil)
                          full-path (str (str/replace (str/join "/" stack) #"//" "/") "/" filename)
                          new-sizes (if is-file
                                      (let [parent-dirs (vec (get-parent-dirs full-path))]
                                         (loop [j 0
                                                s sizes]
                                           (if (< j (count parent-dirs))
                                             (do
                                               (recur (inc j) (update-filesize-at-path s (get parent-dirs j) filesize)))
                                             s)))
                                      sizes)]
                          (recur (inc i) new-stack new-sizes))
                    sizes)))

(println "Part 1:"
  (->> filesystem
       (filter (fn [[_ filesize]]
                 (<= filesize 100000)))
       (map #(get %1 1))
       (reduce +)))

(def required-delete (- 30000000 (- 70000000 (get filesystem "/"))))

(println "Part 2:"
  (->> filesystem
       (map (fn [[_ size]] size))
       sort
       (filter (fn [size] (> size required-delete)))
       first))

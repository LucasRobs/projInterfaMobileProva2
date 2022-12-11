import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from "./src/config/firebase";

export default function App() {
  const [criarAluno, setCriarAluno] = useState(false);
  const [criarProfessor, setCriarProfessor] = useState(false);
  const [editarAluno, setEditarAluno] = useState(false);
  const [editarProfessor, setEditarProfessor] = useState(false);

  const [update, setUpdate] = useState(false);

  const [data1, setData1] = useState("");
  const [data2, setData2] = useState("");
  const [data3, setData3] = useState("");
  const [estudantes, setEstudantes] = useState([]);
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    getDocs(collection(db, "Aluno"))
      .then((snapshot) => {
        const students = [];
        snapshot.forEach((document) => {
          const id = document.id;
          const { nome, curso, ira } = document.data();
          students.push({ id, nome, curso, ira });
        });
        setEstudantes(students);
      })
      .catch((error) => console.log(error));

    getDocs(collection(db, "Professor"))
      .then((snapshot) => {
        const profs = [];
        snapshot.forEach((document) => {
          const id = document.id;
          const { nome, curso, salario } = document.data();
          profs.push({ id, nome, curso, salario });
        });
        setProfessores(profs);
        profs.log(students);
      })
      .catch((error) => console.log(error));
  }, [update]);

  function limparData() {
    setData1("");
    setData2("");
    setData3("");
  }

  function createAluno() {
    addDoc(collection(db, "Aluno"), {
      nome: data1,
      curso: data2,
      ira: data3,
    })
      .then(() => {
        limparData();
        setUpdate(!update);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function createProfessor() {
    addDoc(collection(db, "Professor"), {
      nome: data1,
      curso: data2,
      salario: data3,
    })
      .then(() => {
        limparData();
        setUpdate(!update);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function deleteAluno(id) {
    deleteDoc(doc(db, "Aluno", id))
      .then(() => setUpdate(!update))
      .catch((error) => console.log(error));
  }

  function deleteProfessor(id) {
    deleteDoc(doc(db, "Professor", id))
      .then(() => setUpdate(!update))
      .catch((error) => console.log(error));
  }

  function editAluno(id) {
    updateDoc(doc(db, "Aluno", id), {
      nome: data1,
      curso: data2,
      ira: data3,
    })
      .then(() => {
        limparData();
        setEditarAluno("");
        setUpdate(!update);
      })
      .catch((error) => console.log(error));
  }
  function editProfessor(id) {
    updateDoc(doc(db, "Professor", id), {
      nome: data1,
      curso: data2,
      salario: data3,
    })
      .then(() => {
        limparData();
        setEditarProfessor("");
        setUpdate(!update);
      })
      .catch((error) => console.log(error));
  }

  function viewCreate(type) {
    return (
      <View style={styles.row}>
        <input
          style={styles.umQuarto}
          onChange={(data) => {
            setData1(data.target.value);
          }}
          value={data1}
          placeholder="nome"
        ></input>
        <input
          style={styles.umQuarto}
          onChange={(data) => {
            setData2(data.target.value);
          }}
          value={data2}
          placeholder="curso"
        ></input>
        <input
          style={styles.umQuarto}
          onChange={(data) => {
            setData3(data.target.value);
          }}
          value={data3}
          placeholder={type == "aluno" ? "ira" : "salário"}
        ></input>
        <button
          style={styles.umQuarto}
          onClick={() => {
            type == "aluno" ? createAluno() : createProfessor();
          }}
        >
          enviar
        </button>
      </View>
    );
  }

  function viewEdit(id, type) {
    return (
      <View style={styles.row}>
        <input
          style={styles.umQuarto}
          onChange={(data) => {
            setData1(data.target.value);
          }}
          value={data1}
          placeholder="nome"
        ></input>
        <input
          style={styles.umQuarto}
          onChange={(data) => {
            setData2(data.target.value);
          }}
          value={data2}
          placeholder="curso"
        ></input>
        <input
          style={styles.umQuarto}
          onChange={(data) => {
            setData3(data.target.value);
          }}
          value={data3}
          placeholder={type == "aluno" ? "ira" : "salário"}
        ></input>
        <button
          style={styles.umQuarto}
          onClick={() => {
            type == "aluno" ? editAluno(id) : editProfessor(id);
          }}
        >
          atualizar
        </button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <View style={styles.session}>
        <Text>Estudantes!</Text>
        <span
          class="material-icons"
          onClick={() => {
            setCriarProfessor(false);
            setCriarAluno(!criarAluno);
          }}
        >
          person_add
        </span>
      </View>
      {criarAluno && viewCreate("aluno")}
      {estudantes.map((aluno) => {
        return (
          <View style={styles.row}>
            {editarAluno === aluno.id ? (
              viewEdit(aluno.id, "aluno")
            ) : (
              <>
                <Text style={styles.umQuarto}>{aluno.nome}</Text>
                <Text style={styles.umQuarto}>{aluno.curso}</Text>
                <Text style={styles.umQuarto}>{aluno.ira}</Text>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "20%",
                    justifyContent: "flex-end",
                  }}
                >
                  <span
                    class="material-icons"
                    onClick={() => {
                      deleteAluno(aluno.id);
                    }}
                  >
                    delete_outline
                  </span>
                  <span
                    class="material-icons"
                    onClick={() => {
                      setCriarAluno(false);
                      setCriarProfessor(false);
                      setEditarAluno(aluno.id);
                      setData1(aluno.nome);
                      setData2(aluno.curso);
                      setData3(aluno.ira);
                    }}
                  >
                    mode_edit
                  </span>
                </View>
              </>
            )}
          </View>
        );
      })}

      <View style={styles.session}>
        <Text>Professors!</Text>
        <span
          class="material-icons"
          onClick={() => {
            setCriarAluno(false);
            setCriarProfessor(!criarProfessor);
          }}
        >
          person_add
        </span>
      </View>
      {criarProfessor && viewCreate("professor")}
      {professores.map((professor) => {
        return (
          <View style={styles.row}>
            {editarProfessor === professor.id ? (
              viewEdit(professor.id, "professor")
            ) : (
              <>
                <Text style={styles.umQuarto}>{professor.nome}</Text>
                <Text style={styles.umQuarto}>{professor.curso}</Text>
                <Text style={styles.umQuarto}>{professor.salario}</Text>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "20%",
                    justifyContent: "flex-end",
                  }}
                >
                  <span
                    class="material-icons"
                    onClick={() => {
                      deleteProfessor(professor.id);
                    }}
                  >
                    delete_outline
                  </span>
                  <span
                    class="material-icons"
                    onClick={() => {
                      setCriarAluno(false);
                      setCriarProfessor(false);
                      setEditarProfessor(professor.id);
                      setData1(professor.nome);
                      setData2(professor.curso);
                      setData3(professor.salario);
                    }}
                  >
                    mode_edit
                  </span>
                </View>
              </>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  session: {
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  row: {
    marginTop: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 4,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f5f5f4",
  },

  umQuarto: {
    width: "20%",
  },
});

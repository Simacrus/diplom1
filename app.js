const http = require("http");
const Urok = require("./controller");
const Taking = require("./controller");
const { getReqData } = require("./utils");
const PORT = process.env.PORT || 5000;


const server = http.createServer(async (req, res) => {
    
    if (req.method === 'OPTIONS') {
        res.writeHead(
            200,
            {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*'
            }
        )
        res.end();
    }else 

    if (req.url === "/lessons" && req.method === "GET") {
      const body = await getReqData(req);
      //const token = JSON.parse(body);
      const token = req.headers["authorization"];
      const lessons = await new Urok().getUroks(token);
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*"
      });
      res.end(JSON.stringify(lessons));
    }

    if (req.url.match(/\/lessons\/([0-9]+)/) && req.method === "GET") {
        try {
            const id = req.url.split("/")[2];
            const urok = (await new Urok().getUroks("a")).find(iter => iter.id_urok == id);
            res.writeHead(200, {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*'
            });
            res.end(JSON.stringify(urok));
        } catch (error) {
            res.writeHead(404, {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*'
            });
            res.end(JSON.stringify({ message: error }));
        }
    }



    // if (req.url.match(/lessons\/([0-9]+)/) && req.method === "GET") {
    //     try {
    //       const id = req.url.split("/")[2];
    //       const token = req.headers.token; // Получение токена пользователя из заголовков запроса
      
    //       // Проверка токена пользователя (реализуйте свою логику проверки токена)
    //       if (validateToken(token)) {
    //         const urok = await UrokModel.findById(id); // Получение записи по указанному идентификатору
      
    //         // Если запись с указанным ID не найдена, бросьте исключение
    //         if (!urok) {
    //           throw new Error("Запись не найдена");
    //         }
      
    //         res.writeHead(200, {
    //           "Content-Type": "application/json",
    //           "Access-Control-Allow-Origin": "*",
    //           "Access-Control-Allow-Methods": "*",
    //           "Access-Control-Allow-Headers": "*",
    //         });
    //         res.end(JSON.stringify(urok));
    //       } else {
    //         // Если токен недействителен, отправьте ошибку авторизации
    //         res.writeHead(401, {
    //           "Content-Type": "application/json",
    //           "Access-Control-Allow-Origin": "*",
    //           "Access-Control-Allow-Methods": "*",
    //           "Access-Control-Allow-Headers": "*",
    //         });
    //         res.end(JSON.stringify({ message: "Ошибка авторизации" }));
    //       }
    //     } catch (error) {
    //       res.writeHead(404, {
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "*",
    //         "Access-Control-Allow-Methods": "*",
    //         "Access-Control-Allow-Headers": "*",
    //       });
    //       res.end(JSON.stringify({ message: error }));
    //     }
    //   }
      
      


    //  if (req.url.match(/\/api\/lessons\/prescriptions\/([0-9]+)/) && req.method === "GET") {
    //     try {
    //         const id = req.url.split("/")[3];
    //         const drug = await new Urok().getUrok(id);
    //         res.writeHead(200, {
    //             "Content-Type": "application/json",
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Methods': '*',
    //             'Access-Control-Allow-Headers': '*'
    //         });
    //         res.end(JSON.stringify(drug));
    //     } catch (error) {
    //         res.writeHead(404, {
    //             "Content-Type": "application/json",
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Methods': '*',
    //             'Access-Control-Allow-Headers': '*'
    //         });
    //         res.end(JSON.stringify({ message: error }));
    //     }
    // }


    // else if (req.url.match(/\/api\/lessons\/prescriptions\/([0-9]+)/) && req.method === "DELETE") {
    //     try {
    //         const id = req.url.split("/")[4];
    //         const body = await getReqData(req);
    //         const token = JSON.parse(body);
    //         let message = await new Urok().deleteUrok(token.token_user, id);
    //         res.writeHead(200, {
    //             "Content-Type": "application/json",
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Methods': '*',
    //             'Access-Control-Allow-Headers': '*'
    //         });
    //         res.end(JSON.stringify({ message }));
    //     } catch (error) {
    //         res.writeHead(404, {
    //             "Content-Type": "application/json",
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Methods': '*',
    //             'Access-Control-Allow-Headers': '*'
    //         });
    //         res.end(JSON.stringify({ message: error }));
    //     }
    // }


    // else if (req.url.match(/\/api\/lessons\/prescriptions\/([0-9]+)/) && req.method === "PATCH") {
    //     try {
    //         const id = req.url.split("/")[4];
    //         const body = await getReqData(req);
    //         const token = JSON.parse(body);
    //         let updated_drug = await new Urok().updateUrok(id, token.token_user);
    //         res.writeHead(200, {
    //             "Content-Type": "application/json",
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Methods': '*',
    //             'Access-Control-Allow-Headers': '*'
    //         });
    //         res.end(JSON.stringify(updated_drug));
    //     } catch (error) {
    //         res.writeHead(404, {
    //             "Content-Type": "application/json",
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Methods': '*',
    //             'Access-Control-Allow-Headers': '*'
    //         });
    //         res.end(JSON.stringify({ message: error }));
    //     }
    // }


    // else if (req.url === "/api/lessons" && req.method === "POST") {
    //     const body = await getReqData(req);
    //     const token = JSON.parse(body);
    //   //  let drug_data = await getReqData(req);
    //     // const drug = JSON.parse(drug_data);
    //     let newUrok = await new Urok().createUrok(token.token_user, token.drug_name, token.days, token.start_date, token.how_much_in_day);
    //     res.writeHead(200, {
    //         "Content-Type": "application/json",
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Methods': '*',
    //         'Access-Control-Allow-Headers': '*'
    //     });
    //     res.end(JSON.stringify({ id: newUrok }));
    // }

    // else if (req.url === "/api/drugs/taking" && req.method === "POST") {
    //     const body = await getReqData(req);
    //     const token = JSON.parse(body);
    //     //  let drug_data = await getReqData(req);
    //     // const drug = JSON.parse(drug_data);
    //     let newTaking = await new Taking().createTaking( token.token_user, token.id_prescription, token.date);
    //     res.writeHead(200, {
    //         "Content-Type": "application/json",
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Methods': '*',
    //         'Access-Control-Allow-Headers': '*'
    //     });
    //     res.end(JSON.stringify({ id: newTaking }));
    // }

    // else if (req.url.match("/api/drugs/deltaking") && req.method === "DELETE") {
    //         const body = await getReqData(req);
    //   //      const token = JSON.parse(body);
    //         const taking = JSON.parse(body);
    //     console.log(taking);
    //         let message = await new Taking().deleteTaking(taking.token_user, taking.id_taking);
    //     res.writeHead(200, {
    //         "Content-Type": "application/json",
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Methods': '*',
    //         'Access-Control-Allow-Headers': '*'
    //     });
    //         res.end(JSON.stringify({ message }));
    // }

//user
    else if (req.url === "/registration" && req.method === "POST") {
    let user_data = await getReqData(req);
    const user = JSON.parse(user_data);
    let newUser = await new Urok().createUser(user.id_user, user.FirstName, user.LastName, user.login, user.password);
        res.writeHead(200, {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        });
    res.end(JSON.stringify({ id: newUser }));
    }

    else if (req.url === "/login" && req.method === "POST") {
        let user_data = await getReqData(req);
        const user = JSON.parse(user_data);
        let LoginUser = await new Urok().loginUser(user.login, user.password);
        res.writeHead(200, {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        });
        res.end(JSON.stringify({ token_user: LoginUser }));
    }

else if (req.url === "/logout" && req.method === "GET") {
    let user_data = await getReqData(req);
    const user = JSON.parse(user_data);
    await new Urok().logout(user.token_user);
        res.writeHead(200, {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        });
    res.end("");
    }
});


server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});